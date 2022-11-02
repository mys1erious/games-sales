# Settings for AWS, but usually the instance is turned off
#   due to Free Tier limitations

from .base import *


DEBUG = False
ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': get_env_var('DATABASE_NAME'),
        'HOST': get_env_var('DATABASE_HOST'),
        'PORT': get_env_var('DATABASE_PORT'),
        'USER': get_env_var('DATABASE_USER'),
        'PASSWORD': get_env_var('DATABASE_PASSWORD')
    }
}


AWS_ACCESS_KEY_ID = get_env_var('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = get_env_var('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = get_env_var('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
AWS_DEFAULT_ACL = 'public-read'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'games_sales', 'static')]
STATICFILES_STORAGE = 'core.storages.StaticS3Storage'
DEFAULT_FILE_STORAGE = 'core.storages.MediaS3Storage'
STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'


SPECTACULAR_SETTINGS['SERVERS'] = [
    {
        'url': f'https://{ALLOWED_HOSTS[0]}/api/v1',
        'description': 'AWS Server'
    }
]
