from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .cart_products import seed_user_cart_products, undo_user_cart_products
from .orders import seed_orders, undo_orders
from .product_images import seed_product_images, undo_product_images
from .product_orders import seed_product_orders, undo_product_orders
from .user_wishes import seed_user_wishes, undo_user_wishes
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_product_orders()
        undo_product_images()
        undo_orders()
        undo_user_cart_products()
        undo_user_wishes()
        undo_reviews()
        undo_products()
        undo_users()
    seed_users()
    seed_products()
    seed_reviews()
    seed_user_cart_products()
    seed_orders()
    seed_product_images()
    seed_product_orders()
    seed_user_wishes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_product_orders()
    undo_product_images()
    undo_orders()
    undo_user_cart_products()
    undo_user_wishes()
    undo_reviews()
    undo_products()
    undo_users()

    # Add other undo functions here
