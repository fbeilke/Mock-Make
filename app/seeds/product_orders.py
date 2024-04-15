from app.models import db, ProductOrder, environment, SCHEMA


def seed_product_orders():

    product_order1 = ProductOrder(
        product_id=1,
        order_id=1,
        quantity=2
    )

    product_order2 = ProductOrder(
        product_id=2,
        order_id=1,
        quantity=1
    )

    product_order3 = ProductOrder(
        product_id=3,
        order_id=2,
        quantity=1
    )



    all_product_orders = [product_order1, product_order2, product_order3]

    # Add all product orders to the session and commit to the database
    _ = [db.session.add(po) for po in all_product_orders]
    db.session.commit()

def undo_product_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_orders")
    db.session.commit()
