from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include

from core import apiv1_urls


urlpatterns = [
    path(
        route='api/v1/',
        view=include((apiv1_urls, 'core'), namespace='api')
    ),

    # For some reason when its put inside apiv1_urls
    #   it doesn't see the 'drf' namespace on first site load
    #   so at least for now putting it here
    path(
        route='api/v1/auth/',
        view=include('drf_social_oauth2.urls', namespace='drf'),
    ),
    path(
        route='',
        view=lambda request: redirect('api:documentation')
    ),

    path(
        route='__debug__/',
        view=include('debug_toolbar.urls')
    ),
    path('admin/', admin.site.urls)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
