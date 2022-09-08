from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView

from core import apiv1_urls


urlpatterns = [
    path(
        route='api/v1/',
        view=include(apiv1_urls),
        name='api'
    ),

    path(
        route='__debug__/',
        view=include('debug_toolbar.urls')
    ),
    path(
        route='schema/',
        view=SpectacularAPIView.as_view(),
        name='schema'
    ),
    path(
        route='documentation/',
        view=TemplateView.as_view(
            template_name='swagger-ui.html',
            extra_context={'schema_url': 'schema'},
        ),
        name='documentation'
    ),
    path('admin/', admin.site.urls)
]
