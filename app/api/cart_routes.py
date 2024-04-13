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
    cart_product = CartProduct(
        product_id = data.productId,
        user_id = data.userId,
        quantity = data.quantity
    )
    db.session.add(cart_product)
    db.session.commit()
    return cart_product.to_dict()

@cart.put('/')
@login_required
def change_product_quantity():
    data = request.json
    cart_product = CartProduct.query.filter(CartProduct.product_id == data.productId, CartProduct.user_id == data.userId)
    cart_product.quantity = data.quantity
    db.session.commit()
    return cart_product.to_dict()

@cart.delete('/')
@login_required
def delete_cart_product():
    data = request.json
    cart_product = CartProduct.query.filter(CartProduct.product_id == data.productId, CartProduct.user_id == data.userId)
    deleted = cart_product.to_dict()
    db.session.delete(cart_product)
    db.session.commit()
    return deleted