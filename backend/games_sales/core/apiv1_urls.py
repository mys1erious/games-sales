from django.contrib import admin
from django.urls import path, include

from sales.api import views as sale_views


urlpatterns = [
    # -- Sales --
    # {% url 'api:sales' %}
    path(
        route='sales/',
        view=sale_views.SaleListAPIView.as_view(),
        name='sales'
    ),
    # {% url 'api:sales' slug %}
    path(
        route='sales/<slug:slug>/',
        view=sale_views.SaleDetailAPIView.as_view(),
        name='sales'
    )
]
