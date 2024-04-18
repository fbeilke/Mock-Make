from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS

class CreateReviewForm(FlaskForm):
    content = TextAreaField('Content', validators=[DataRequired(), Length(min=10, max=500)])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    image = FileField('Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), 'Images only!')])
