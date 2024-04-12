from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product
from app.forms.product_form import ProductForm

products_routes = Blueprint("products_routes", __name__)

@products_routes.route('/')
def get_all_products():
    '''
    Return list of all product dictionaries
    '''
    all_products = Product.query.all()
    return [product.to_dict() for product in all_products]


## Need to add this route to backend routes list
@products_routes.route('/<string:category>')
def get_products_by_category(category):
    '''
    Return a list of product dictionaries in specified category
    '''
    products_by_category = Product.query.filter(Product.category == category).all()
    return [product.to_dict() for product in products_by_category]

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
    data = request.json
    form = ProductForm(**data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data["vendor_id"] = current_user["id"]
        new_product = Product(**data)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
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
        db.session.delete(product_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}
    else:
        return {"message": "Product with provided id was not found."}
