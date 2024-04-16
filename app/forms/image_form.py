from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField(validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
