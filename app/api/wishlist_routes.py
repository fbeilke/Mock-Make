from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, UserWish

wishlist_routes = Blueprint('wishlist', __name__)

@wishlist_routes.route('/<int:user_id>/wishlist', methods=['GET'])
@login_required
def get_wishlist(user_id):
    if user_id != current_user.id:
        print(data)
        return jsonify({'error': 'Unauthorized'}), 403

    wishes = UserWish.query.filter_by(user_id=user_id).all()
    wishlist_items = [wish.to_dict() for wish in wishes]
    return jsonify(wishlist_items), 200

@wishlist_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['POST'])
@login_required
def add_to_wishlist(user_id, product_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Assuming that a UserWish has a quantity default value set
    new_wish = UserWish(user_id=user_id, product_id=product_id)
    db.session.add(new_wish)
    db.session.commit()
    return jsonify(new_wish.to_dict()), 201

@wishlist_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['DELETE'])
@login_required
def remove_from_wishlist(user_id, product_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    wish = UserWish.query.filter_by(user_id=user_id, product_id=product_id).first()
    if wish:
        db.session.delete(wish)
        db.session.commit()
        return jsonify({'message': 'Removed from wishlist'}), 200
    return jsonify({'error': 'Wish not found'}), 404
