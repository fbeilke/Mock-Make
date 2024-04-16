from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, CartProduct

cart = Blueprint('cart',__name__)

@cart.get('/')
@login_required
def get_cart_products():
    cart_products = CartProduct.query.filter(CartProduct.user_id == current_user.id)
    return [cart_product.to_dict() for cart_product in cart_products]

@cart.post('/')
@login_required
def add_cart_product():
    data = request.json

    # Check if the product is already in the cart
    exists = CartProduct.query.filter_by(product_id = data["productId"]).first()
    if exists:
        exists.quantity += 1
        db.session.commit()
        db.session.refresh(exists)
        return exists.to_dict()
    
    cart_product = CartProduct(
        product_id = data["productId"],
        user_id = current_user.id,
        quantity = data["quantity"]
    )
    db.session.add(cart_product)
    db.session.commit()
    return cart_product.to_dict()

@cart.put('/')
@login_required
def change_product_quantity():
    data = request.json
    print("DATA", data)
    cart_product = CartProduct.query.filter(CartProduct.product_id == data['productId'], CartProduct.user_id == current_user.id).first()
    cart_product.quantity = data['quantity']
    db.session.commit()
    db.session.refresh(cart_product)
    return cart_product.to_dict()

@cart.delete('/')
@login_required
def empty_cart():
    cart_products = CartProduct.query.filter_by(user_id = current_user.id).all()
    for product in cart_products:
        db.session.delete(product)
    db.session.commit()
    return {"message": "cart successfully emptied"}

@cart.delete('/<int:id>')
@login_required
def delete_cart_product(id):
    cart_product = CartProduct.query.filter_by(product_id = id, user_id = current_user.id).first()
    deleted = cart_product.to_dict()
    db.session.delete(cart_product)
    db.session.commit()
    return deleted