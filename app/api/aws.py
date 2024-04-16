import boto3
import botocore
import os

import uuid

s3 = boto3.client(
    's3',
    aws_access_key_id = os.environ.get("S3_ACCESS_KEY"),
    aws_secret_access_key = os.environ.get("S3_SECRET_KEY")
)

ALLOWED_EXTENSIONS = {'pdf', 'gif', 'png', 'jpg', 'jpeg', 'webp'}