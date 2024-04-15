from flask import Blueprint, jsonify, request
from app.models import db, Review
from flask_login import current_user, login_required
#from app.forms.review_form import CreateReviewForm

reviews_routes = Blueprint('reviews', __name__)

# GET ALL REVIEWS FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    reviews_list = [review.to_dict() for review in reviews]
    return jsonify(reviews_list)

# POST A REVIEW FOR A SPECIFIC PRODUCT
# @review_routes.route('/products/<int:product_id>/reviews', methods=['POST'])
# @login_required
# def post_review(product_id):
#     form = CreateReviewForm()
#     if form.validate_on_submit():
#         new_review = Review(
#             user_id=current_user.id,
#             product_id=product_id,
#             review=form.review.data,
#             rating=form.rating.data
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
