# Settings for PythonAnywhere

from .base import *


# Change to false
DEBUG = True
ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = []

DATABASES = {
    'default': {
        'ENGINE': 'mysql',
        'NAME': get_env_var('DATABASE_NAME'),
        'HOST': get_env_var('DATABASE_HOST'),
        'PORT': get_env_var('DATABASE_PORT'),
        'USER': get_env_var('DATABASE_USER'),
        'PASSWORD': get_env_var('DATABASE_PASSWORD')
    }
}


STATIC_URL = '/django_static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'games_sales', 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'collectedstatic')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media')


SPECTACULAR_SETTINGS['SERVERS'] = [
    {
        'url': f'https://{ALLOWED_HOSTS[0]}/api/v1',
        'description': 'PythonAnywhere server'
    }
]
