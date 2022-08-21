from .base import *


DEBUG = True

# # For Docker testing
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': 'mydatabase',
#     }
# }

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

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'postgres',
#         'HOST': 'db',
#         'PORT': 5432,
#         'USER': 'postgres',
#         'PASSWORD': 'postgres'
#     }
# }
