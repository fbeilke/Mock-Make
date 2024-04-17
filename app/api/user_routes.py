from flask import Blueprint, jsonify, request
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

@user_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['POST'])
@login_required
def add_to_wishlist(user_id, product_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Get the quantity from the request; default to 1 if not specified
    data = request.get_json()
    quantity = data.get('quantity', 1)

    # Find existing wish
    existing_wish = UserWish.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing_wish:
        # Update the quantity of the existing wish
        existing_wish.quantity = quantity
        db.session.commit()
        return jsonify(existing_wish.to_dict()), 200
    else:
        # Create a new wish if it doesn't exist
        new_wish = UserWish(user_id=user_id, product_id=product_id, quantity=quantity)
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
