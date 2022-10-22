from django.urls import path, include

from sales.api import views as sale_views
from reports.api import views as report_views
from accounts.api import views as account_views


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
    ),
    # {% url 'api:sale_genres' %}
    path(
        route='sale-filters/',
        view=sale_views.SaleFilterFieldsListAPIView.as_view(),
        name='sale_filters'
    ),
    # {% url 'api:sale_analysis' %}
    path(
        route='sale-analysis/',
        view=sale_views.SaleAnalysisAPIView.as_view(),
        name='sale_analysis'
    ),

    # -- Reports --
    path(
        route='reports/',
        view=report_views.ReportsListAPIView.as_view(),
        name='reports'
    ),

    # -- Auth --
    path(
        route='auth/',
        view=include('drf_social_oauth2.urls', namespace='drf'),
    ),
    path(
        route='auth/signup/',
        view=account_views.UserSignUpAPIView.as_view(),
        name='signup'
    ),
    path(
        route='auth/confirm-email/',
        view=account_views.UserConfirmEmailAPIView.as_view(),
        name='confirm_email'
    )
]
