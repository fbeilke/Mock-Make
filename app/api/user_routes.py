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

@user_routes.route('/<int:id>/wishlist')
def user_wishlist(id):
    """
    Query for a user's wishlist and returns it in a dictionary.
    """
    user_wishes = UserWish.query.filter(UserWish.user_id == id).all()
    return {user_wish.product_id:user_wish.to_dict() for user_wish in user_wishes}

@user_routes.route('/wishlist/', methods=['POST'])
@login_required
def add_to_wishlist():

    # Get the quantity from the request; default to 1 if not specified
    data = request.get_json()
    product_id = data.get('productId')

    # Find existing wish
    existing_wish = UserWish.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if existing_wish:
        # Update the quantity of the existing wish
        existing_wish.quantity += 1
        db.session.commit()
        return existing_wish.to_dict(), 200
    else:
        # Create a new wish if it doesn't exist
        new_wish = UserWish(user_id=current_user.id, product_id=product_id, quantity=1)
        db.session.add(new_wish)
        db.session.commit()
        return new_wish.to_dict(), 201

@user_routes.route('/<int:user_id>/wishlist/<int:product_id>', methods=['DELETE'])
@login_required
def remove_from_wishlist(user_id, product_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    wish = UserWish.query.filter_by(user_id=user_id, product_id=product_id).first()
    if wish:
        db.session.delete(wish)
        db.session.commit()
        return {'message': 'Removed from wishlist'}, 200
    return {'error': 'Wish not found'}, 404
