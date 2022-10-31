from .base import *


DEBUG = True

ALLOWED_HOSTS = ['localhost']


MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media')
MEDIA_URL = '/media/'


CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://127.0.0.1:3000',
    'https://localhost:3000'
]

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


INSTALLED_APPS += ['debug_toolbar']


INTERNAL_IPS = [
    'localhost',
    '127.0.0.1'
]


SPECTACULAR_SETTINGS['SERVERS'] = [
    {
        'url': f'http://{ALLOWED_HOSTS[0]}:8000/api/v1',
        'description': 'Local dev server'
    }
]
