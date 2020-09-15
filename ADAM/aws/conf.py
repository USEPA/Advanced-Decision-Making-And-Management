import datetime
AWS_ACCESS_KEY_ID = "AWS_key_ID"
AWS_SECRET_ACCESS_KEY = "AWS_secret_access_key"

AWS_FILE_EXPIRE = 200
AWS_PRELOAD_METADATA = True
AWS_QUERYSTRING_AUTH = True


STATICFILES_STORAGE = 'ADAM.aws.utils.StaticRootS3BotoStorage'

AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
S3DIRECT_REGION = 'us-east-2'
S3_URL = 'your-s3-bucket-url'

STATIC_URL = S3_URL + 'static/'
ADMIN_MEDIA_PREFIX = STATIC_URL + 'admin/'

AWS_S3_REGION_NAME = 'us-east-2'
AWS_S3_SIGNATURE_VERSION = 's3v4'

two_months = datetime.timedelta(days=61)
date_two_months_later = datetime.date.today() + two_months
expires = date_two_months_later.strftime("%A, %d %B %Y 20:00:00 GMT")
AWS_HEADERS = { 'Expires': expires, 'Cache-Control': 'max-age=%d' % (int(two_months.total_seconds()), ),}
