from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage
from app.forms import ProductForm, ImageForm
from .aws import unique_filename, s3_upload_file, s3_remove_file

products_routes = Blueprint("products_routes", __name__)

@products_routes.route('/')
def get_all_products():
    '''
    Return list of all product dictionaries, optionally filtered by search params
    '''

    search_name = request.args.get('name')
    print("SEARCH FOR:", search_name)

    if search_name != None:
        search_results = Product.query.filter(Product.name.ilike(f'%{search_name}%')).all()
        return [product.id for product in search_results]

    all_products = Product.query.all()
    return {product.to_dict()["id"]: product.to_dict() for product in all_products}


## Need to add this route to backend routes list
@products_routes.route('/<string:category>')
def get_products_by_category(category):
    '''
    Return a list of product dictionaries in specified category
    '''
    products_by_category = Product.query.filter(Product.category == category).all()
    return {product.to_dict()["id"]: product.to_dict() for product in products_by_category}

@products_routes.route('/<int:id>')
def get_single_product(id):
    '''
    Return dictionary of single product full details
    '''
    single_product = Product.query.filter(Product.id == id).first()
    return single_product.to_dict()

@products_routes.route('/', methods=["POST"])
@login_required
def create_new_product():
    '''
    Return data in dictionary for a new product
    '''
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(**{key: value for key,value in form.data.items() if key not in ['csrf_token', 'image']})
        new_product.vendor_id = current_user.id

        image = form.image.data
        image.filename = unique_filename(image.filename)

        upload = s3_upload_file(image)

        # If the S3 upload fails:
        if 'url' not in upload:
            # AWS ERROR OBJECT {"errors": <aws_error>}
            return upload, 400

        new_product_image = ProductImage(
            url=upload['url'],
            preview=True
        )

        new_product.images.append(new_product_image)

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict(), 201
    elif form.errors:
        return form.errors, 400
    else:
        return {"message": "There was an error"}, 500


@products_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_product(id):
    '''
    Return item in dictionary after updated
    '''
    data = request.json
    form = ProductForm(**data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_to_update = Product.query.filter(Product.id == id).first()
        for key, value in data.items():
            setattr(product_to_update, key, value)
        db.session.commit()
        return product_to_update.to_dict()
    elif form.errors:
        return form.errors, 400
    else :
        return {"message": "There was an error"}, 500




@products_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_product(id):
    '''
    Return message if successfully deleted.
    '''
    product_to_delete = Product.query.filter(Product.id == id).first()
    if product_to_delete:
        deleted = product_to_delete.to_dict()

        # Product delete
        db.session.delete(product_to_delete)
        db.session.commit()


        # AWS IMAGE DELETE
        if 'imageUrl' in deleted:
            image_url = deleted['imageUrl']

            removed = s3_remove_file(image_url)

            if removed != True:
                print("AWS ERROR:", removed["errors"])


        return {"message": "Successfully deleted"}
    else:
        return {"message": "Product with provided id was not found."}



@products_routes.post('/<int:id>/product_images')
@login_required
def create_new_image(id):
    """
    Adds an image file to the product specified by <id>
    """
    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Get the image file from the form
        image = form.data["image"]
        # Generate unique filename for image
        # Rename the file to unique string
        image.filename = unique_filename(image.filename)
        # Send to S3 bucket
        upload = s3_upload_file(image)
        # Print (error check)
        print(upload)

        # If the file upload fails
        if "url" not in upload:
            # Return {"errors": <aws_errors>}
            return upload

        # File upload success - grab the aws url
        url = upload["url"]
        # Check if an image already exists
        # If so set preview to false
        num_product_images = len(ProductImage.query.filter_by(product_id=id).all())
        preview = num_product_images < 1

        # If there are 5 images already, send an error
        if num_product_images >= 5:
            return {'errors': 'products can only have 5 images' }, 400

        # Create new product image object with url, product id, and preview
        new_image = ProductImage(
            url=url,
            product_id=int(id),
            preview=preview
        )

        # Persist in db
        db.session.add(new_image)
        db.session.commit()

        # Grab latest version of object from db (just in case)
        db.session.refresh(new_image)

        # Return image to client
        return new_image.to_dict(), 201

    # If the form doesn't validate successfully, send errors
    return { "errors": form.errors }, 400
