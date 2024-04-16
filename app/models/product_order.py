from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductOrder(db.Model):
    __tablename__ = "product_orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    # Note that we should keep the products around after they are removed by
    # vendors so that they will continue to populate past orders
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'), ondelete='CASCADE'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), primary_key = True)
    quantity = db.Column(db.Integer)

    order = db.relationship('Order', back_populates='product_orders')

    def to_dict(self):
        return {
            "orderId": self.order_id,
            "productId": self.product_id,
            "quantity": self.quantity
        }
    
    def from_order(self):
        return {
            "productId": self.product_id,
            "quantity": self.quantity
        }
    
    def __repr__(self):
        return f"<ProductOrder on Order {self.order_id} for {self.quantity} of Product {self.product_id}>"