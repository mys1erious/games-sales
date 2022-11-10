# Settings for PythonAnywhere

from .base import *


DEBUG = False
ALLOWED_HOSTS = ['mysterious.pythonanywhere.com']

CORS_ALLOWED_ORIGINS = [
    'https://games-sales.mys1erious.com',
    'https://games-sales-mys1erious.vercel.app'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': get_env_var('DATABASE_NAME'),
        'HOST': get_env_var('DATABASE_HOST'),
        'PORT': get_env_var('DATABASE_PORT'),
        'USER': get_env_var('DATABASE_USER'),
        'PASSWORD': get_env_var('DATABASE_PASSWORD')
    }
}


STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'games_sales', 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'collectedstatic')
# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media')


AWS_ACCESS_KEY_ID = get_env_var('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = get_env_var('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = get_env_var('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
AWS_DEFAULT_ACL = 'public-read'

DEFAULT_FILE_STORAGE = 'core.storages.MediaS3Storage'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
# STATICFILES_STORAGE = 'core.storages.StaticS3Storage'
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'


SPECTACULAR_SETTINGS['SERVERS'] = [
    {
        'url': f'https://{ALLOWED_HOSTS[0]}/api/v1',
        'description': 'PythonAnywhere server'
    }
]
