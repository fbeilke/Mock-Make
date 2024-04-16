import boto3
import botocore
import os
from uuid import uuid4

s3 = boto3.client(
    's3',
    aws_access_key_id = os.environ.get("S3_ACCESS_KEY"),
    aws_secret_access_key = os.environ.get("S3_SECRET_KEY")
)

ALLOWED_EXTENSIONS = {'pdf', 'gif', 'png', 'jpg', 'jpeg', 'webp'}

def unique_filename(filename):
    """
    Generates a (nearly guaranteed) unique string and appends the file extension to the end.
    For storing image uploads in AWS Bucket
    """
    ext = filename.rsplit(".", 1)[1].lower()
    unique = uuid4().hex
    return f"{unique}.{ext}"

BUCKET_NAME = os.environ.get('S3_BUCKET')
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"


def s3_upload_file(file, acl="public-read"):
    """
    Takes a file and optional Access Control List (acl) and uploads
    the file to the s3 bucket specified by environ.BUCKET_NAME
    """
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}
    
    return {"url": f"{S3_LOCATION}{file.filename}"}


def s3_remove_file(url):
    """
    Takes a url and attempts to delete the file specified by the url
    from the s3 bucket specified by environ.BUCKET_NAME
    """

    # Grabs the name of the file
    # ['https://...etc', '<filename>.ext']
    filename = url.rsplit('/', 1)[1]

    try:
        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=filename
        )
    except Exception as e:
        return {"errors": str(e)}
    return True