from django.urls import path

from drf_spectacular.views import SpectacularAPIView

from sales.api import views as sale_views
from reports.api import views as report_views
from accounts.api import views as account_views

from .views import SpectacularRapiDocView


app_name = 'core'


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
    # {% url 'api:sale_filters' %}
    path(
        route='sale-filters/',
        view=sale_views.SaleFilterFieldsListAPIView.as_view(),
        name='sale_filters'
    ),
    # {% url 'api:analysis_top_field' %}
    path(
        route='sale-analysis/top-field/',
        view=sale_views.SaleAnalysisTopFieldAPIView.as_view(),
        name='analysis_top_field',
    ),
    # {% url 'api:analysis_describe' %}
    path(
        route='sale-analysis/describe/',
        view=sale_views.SaleAnalysisDescribeAPIView.as_view(),
        name='analysis_describe',
    ),
    # {% url 'api:analysis_score' %}
    path(
        route='sale-analysis/score/',
        view=sale_views.SaleAnalysisScoreAPIView.as_view(),
        name='analysis_score',
    ),
    # {% url 'api:analysis_games_annually' %}
    path(
        route='sale-analysis/games-annually/',
        view=sale_views.SaleAnalysisGamesAnnuallyAPIView.as_view(),
        name='analysis_games_annually',
    ),
    # {% url 'api:analysis_games_by_field' %}
    path(
        route='sale-analysis/games-by-field/',
        view=sale_views.SaleAnalysisGamesByFieldAPIView.as_view(),
        name='analysis_games_by_field',
    ),

    # -- Reports --
    path(
        route='reports/',
        view=report_views.ReportsListAPIView.as_view(),
        name='reports'
    ),

    # -- Auth --
    path(
        route='auth/signup/',
        view=account_views.UserSignUpAPIView.as_view(),
        name='signup'
    ),
    path(
        route='auth/confirm-email/',
        view=account_views.UserConfirmEmailAPIView.as_view(),
        name='confirm_email'
    ),

    # -- Docs --
    path(
        route='schema/',
        view=SpectacularAPIView.as_view(),
        name='schema'
    ),
    path(
        route='',
        view=SpectacularRapiDocView.as_view(),
        name='documentation'
    )
]
