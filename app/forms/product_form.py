from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, Length, NumberRange, AnyOf

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[InputRequired(), Length(200, message="Name must not be over 200 characters")])
    description = StringField("Description", validators=[InputRequired()])
    category = StringField("Category", validators=[InputRequired(), AnyOf(["Home Goods", "Toys & Games", "Art & Collectibles", "Craft Supplies & Tools", "Gifts"], message="Category must be one of the selection options")])
    price = FloatField("Price", validators=[InputRequired(), NumberRange(min=0, max=9999.99, message="Price must be between $0 and $9,999.99")])
