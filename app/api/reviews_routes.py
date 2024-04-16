from flask import Blueprint, jsonify, request
from app.models import db, Review, Product
from flask_login import current_user, login_required
from app.forms.review_form import CreateReviewForm

reviews_routes = Blueprint('reviews', __name__)

# GET ALL REVIEWS FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    reviews_list = [review.to_dict() for review in reviews]
    return jsonify(reviews_list)

# POST A REVIEW FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['POST'])
@login_required
def post_review(product_id):

    data = request.get_json()
    content = data.get('content')
    rating = data.get('rating')

    # Perform data validation
    if content is None or rating is None:
        return jsonify({'error': 'Missing content or rating'}), 400
    if not isinstance(rating, int) or not 1 <= rating <= 5:
        return jsonify({'error': 'Rating must be an integer between 1 and 5'}), 400

    # Create a new review instance
    new_review = Review(
        user_id=current_user.id,
        product_id=product_id,
        content=content,
        rating=rating,
    )

    # Add to the session and commit to the database
    db.session.add(new_review)
    db.session.commit()
    db.session.refresh(new_review)

    # Return the new review as a JSON response
    return jsonify(new_review.to_dict()), 201




@reviews_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404
    if review.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review successfully deleted'}), 200

# def post_review(product_id):
#     # Assume CreateReviewForm is defined and imported correctly
#     form = CreateReviewForm()  # You need to ensure you have this form defined with the fields
#     if form.validate_on_submit():
#         new_review = Review(
#             user_id=current_user.id,
#             product_id=product_id,
#             content=form.content.data,  # Assuming your form has 'content' field
#             rating=form.rating.data  # Assuming your form has 'rating' field
#         )
#         db.session.add(new_review)
#         db.session.commit()
#         return jsonify(new_review.to_dict()), 201
#     return jsonify({'errors': form.errors}), 400

# # DELETE A REVIEW BY REVIEW ID
# @review_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
# @login_required
# def delete_review(review_id):
#     review = Review.query.get(review_id)
#     if not review:
#         return jsonify({'error': 'Review not found'}), 404
#     if review.user_id != current_user.id:
#         return jsonify({'error': 'Unauthorized'}), 403

#     db.session.delete(review)
#     db.session.commit()
#     return jsonify({"message": 'Review successfully deleted.'})


# Helper function to check if the current user is the vendor of the product
# def is_vendor(product_id):
#     product = Product.query.get(product_id)
#     return product.vendor_id == current_user.id

# # POST A REVIEW FOR A SPECIFIC PRODUCT
# @reviews_routes.route('/products/<int:product_id>/reviews', methods=['POST'])
# @login_required
# def post_review(product_id):
#     # Check if the current user is the vendor of the product
#     if is_vendor(product_id):
#         return jsonify({'error': 'Vendors cannot review their own products'}), 403

#     data = request.get_json()
#     print(data)
#     content = data.get('content')
#     rating = data.get('rating')

#     # Validate the required fields
#     if not content or not isinstance(rating, int):
#         return jsonify({'errors': 'Missing required fields'}), 400

#     new_review = Review(
#         user_id=current_user.id,
#         product_id=product_id,
#         content=content,
#         rating=rating
#     )
#     db.session.add(new_review)
#     db.session.commit()
#     return jsonify(new_review.to_dict()), 201

# # DELETE A REVIEW BY REVIEW ID
# @reviews_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
# @login_required
# def delete_review(review_id):
#     review = Review.query.get(review_id)
#     if not review:
#         return jsonify({'error': 'Review not found'}), 404
#     if review.user_id != current_user.id:
#         return jsonify({'error': 'Unauthorized'}), 403

#     db.session.delete(review)
#     db.session.commit()
#     return jsonify({"message": 'Review successfully deleted.'}), 200
