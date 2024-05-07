from flask import Blueprint, jsonify, request
from app.models import db, Review, Product
from flask_login import current_user, login_required
from app.forms.review_form import CreateReviewForm
from .aws import s3_upload_file, s3_remove_file, unique_filename

reviews_routes = Blueprint('reviews', __name__)

# GET ALL REVIEWS FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    reviews_dict = {review.id: review.to_dict() for review in reviews}
    return reviews_dict

# POST A REVIEW FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['POST'])
@login_required
def post_review(product_id):

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    content = form.content.data
    rating = form.rating.data
    image = form.image.data


    if not form.validate_on_submit():
        return {"errors": form.errors}, 400

    if image != "null":
        image.filename = unique_filename(image.filename)
        upload = s3_upload_file(image)
        # If the S3 upload fails:
        if 'url' not in upload:
            # AWS ERROR OBJECT {"errors": <aws_error>}
            return upload, 400
    else:
        upload = {}
        upload["url"] = None

    # upload = { "url": aws_url }

    # Create a new review instance
    new_review = Review(
        user_id=current_user.id,
        product_id=product_id,
        content=content,
        rating=rating,
        image_url=upload["url"]
    )

    # Add to the session and commit to the database
    db.session.add(new_review)
    db.session.commit()
    db.session.refresh(new_review)

    # Return the new review as a JSON response
    return new_review.to_dict(), 201




@reviews_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return {'error': 'Review not found'}, 404
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    deleted = review.to_dict()

    db.session.delete(review)
    db.session.commit()


    if deleted["imageUrl"] != None:
        removed = s3_remove_file(deleted['imageUrl'])

        if removed != True:
            # Print AWS ERROR {"errors": <aws_error>}
            print(removed["errors"])

    return {'message': 'Review successfully deleted'}, 200

@reviews_routes.route('/reviews', methods=["GET"])
def get_all_reviews():
    reviews = Review.query.all()
    return {review.id: review.to_dict() for review in reviews}
