from app.models import db, CartProduct, environment, SCHEMA

def seed_user_cart_products():

    user_cart_data = [
        {"user_id": 1, "product_id": 1, "quantity": 2},
        {"user_id": 1, "product_id": 3, "quantity": 1},
        {"user_id": 2, "product_id": 2, "quantity": 3},
        {"user_id": 2, "product_id": 4, "quantity": 1},
        {"user_id": 3, "product_id": 1, "quantity": 1},
        {"user_id": 3, "product_id": 3, "quantity": 2},

    ]


    for data in user_cart_data:
        cart_product = CartProduct(**data)
        db.session.add(cart_product)

    db.session.commit()

def undo_user_cart_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_cart_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_cart_products")
    db.session.commit()
