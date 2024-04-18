from flask import Blueprint, request, redirect
from flask_login import current_user, login_required
from app.models import db, Order, ProductOrder

orders = Blueprint('orders', __name__)

@orders.get('/')
@login_required
def get_user_orders():
    orders = Order.query.filter_by(user_id = current_user.id).all()

    normal_orders = {}
    normal_orders['byId'] =  {order.id: order.to_dict() for order in orders}
    normal_orders['allIds'] = [order.id for order in orders]
    return normal_orders

@orders.post('/')
@login_required
def create_user_order():
    data = request.json

    order = Order(
        user_id = current_user.id,
        status = "Pending"
    )

    for product in data['productOrders']:
        product_order = ProductOrder(
            product_id = product['productId'],
            order_id = order.id,
            quantity = product['quantity']
        )
        order.product_orders.append(product_order)

    db.session.add(order)
    db.session.commit()
    db.session.refresh(order)

    return {"allIds": [order.id], "byId": { order.id: order.to_dict() }}

@orders.delete('/<int:id>')
@login_required
def cancel_user_order(id):
    order = db.session.get(Order, int(id))

    if order.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()

    return {deleted['id']: deleted}