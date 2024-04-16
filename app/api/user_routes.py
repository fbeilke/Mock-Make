from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, UserWish

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {user.id:user.to_dict() for user in users}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/wishlist', methods=['GET'])
@login_required
def get_wishlist(user_id):
    if user_id != current_user.id:

        return jsonify({'error': 'Unauthorized'}), 403

    wishes = UserWish.query.filter_by(user_id=user_id).all()
    wishlist_items = [wish.to_dict() for wish in wishes]
    return jsonify(wishlist_items), 200

@user_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['POST'])
@login_required
def add_to_wishlist(user_id, product_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Assuming that a UserWish has a quantity default value set
    new_wish = UserWish(user_id=user_id, product_id=product_id)
    db.session.add(new_wish)
    db.session.commit()
    return jsonify(new_wish.to_dict()), 201

@user_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['DELETE'])
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
