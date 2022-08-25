from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path(
        route='api/testumba/',
        view=include('testumba.urls', namespace='testumba')
    ),

    path('admin/', admin.site.urls),
]
