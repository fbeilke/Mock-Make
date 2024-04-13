from app.models import db, Order, environment, SCHEMA
from datetime import datetime

def seed_orders():
    order_data = [
        {"user_id": 1, "status": "Pending"},
        {"user_id": 2, "status": "Shipped"},
        {"user_id": 3, "status": "Delivered"},
    ]

    for data in order_data:
        data["created_at"] = datetime.now()
        data["updated_at"] = datetime.now()
        order = Order(**data)
        db.session.add(order)

    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")
    db.session.commit()
