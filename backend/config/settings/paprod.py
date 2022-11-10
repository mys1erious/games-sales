# Settings for PythonAnywhere

from .base import *


DEBUG = False
ALLOWED_HOSTS = ['mysterious.pythonanywhere.com']

# For now
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

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media')


SPECTACULAR_SETTINGS['SERVERS'] = [
    {
        'url': f'https://{ALLOWED_HOSTS[0]}/api/v1',
        'description': 'PythonAnywhere server'
    }
]
