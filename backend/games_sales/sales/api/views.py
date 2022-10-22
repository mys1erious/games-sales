import json

import pandas as pd

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import QueryDict

from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from core.permissions import IsAdminOrReadOnly
from core.utils import intersected_params
from ..models import Sale, Game, SALE_ORDER_BY_FIELDS
from .serializers import SaleSerializer


class SaleBaseAPIView(APIView, LimitOffsetPagination):
    permission_classes = (AllowAny,)  # Change
    authentication_classes = []

    query_search_param = 'text'
    filter_params = ['genre', 'esrb_rating', 'yor_lt', 'yor_gt', 'year_of_release']
    default_order_by = 'id'

    default_page_size = 8
    default_page = 1

    def get_sales(self, query_params):
        sales = Sale.objects.all()
        sales = self.search(sales, query_params)
        sales = self.filter(sales, query_params)
        sales = self.order_by(sales, query_params)

        return sales

    def search(self, sales, query_params):
        if self.query_search_param in query_params:
            return Sale.search_by_text(sales,
                query_params.get(self.query_search_param)
            )
        return sales

    def filter(self, sales, query_params):
        if any([key in self.filter_params for key in query_params]):
            return Sale.filter_by_params(
                sales, intersected_params(query_params, self.filter_params)
            )
        return sales

    def order_by(self, sales, query_params):
        return sales.order_by(Sale.order_by_mapping(
            query_params.get('order_by', self.default_order_by)
        ))

    def pagination(self, request, page_number, sales):
        paginator = Paginator(sales, self.page_size)

        try:
            paginator_page = paginator.page(page_number)
        except (PageNotAnInteger, EmptyPage):
            paginator_page = paginator.page(self.default_page)

        return SaleSerializer(
            paginator_page,
            many=True,
            context={'request', request}
        ), paginator.num_pages


class SaleListAPIView(SaleBaseAPIView):
    def get(self, request, *args, **kwargs):
        query_params = request.query_params
        sales = self.get_sales(query_params)

        self.page_size = query_params.get('page_size', self.default_page_size)

        serializer, num_pages = self.pagination(
            request,
            query_params.get('page', self.default_page),
            sales
        )

        # Better way to get num_pages without passing it with each request?
        return Response({
            'sales': serializer.data,
            'num_pages': num_pages
        }, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaleDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminOrReadOnly,)
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    lookup_field = 'slug'


class SaleFilterFieldsListAPIView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        genres = Sale.get_all_genres().order_by('game__genre')
        order_by = SALE_ORDER_BY_FIELDS

        # Add readable form ->
        esrb_ratings = Game.ESRBRatings.names

        data = {
            'order_by': order_by,
            'genres': genres,
            'esrb_ratings': esrb_ratings
        }

        return Response(data, status=status.HTTP_200_OK)


class SaleAnalysisAPIView(SaleBaseAPIView):
    permission_classes = (AllowAny,)
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        # name, settings(for report)
        query_params = QueryDict.copy(request.query_params)
        query_params['page_size'] = '-1'

        sales = self.get_sales(query_params)

        # Rework to use dynamic data from 'settings' query arg
        df = pd.DataFrame.from_records(sales.values(
            'na_sales', 'eu_sales', 'jp_sales', 'other_sales', 'global_sales',
            'game__rating__critic_score', 'game__rating__critic_count',
            'game__rating__user_score', 'game__rating__user_count',
            'game__year_of_release', 'game__platform', 'game__genre',
            'game__publisher', 'game__developer'
        ))

        # Rework to use dynamic data from 'settings' query arg
        data_describe = Sale.sales_df_description(df)
        top_platforms = Sale.get_top_n_fields_for_sale_type(
            df,
            field='platform',
            sale_type='global_sales',
            n=10
        )
        top_genres = Sale.get_top_n_fields_for_sale_type(
            df,
            field='genre',
            sale_type='global_sales',
            n=10
        )
        top_publishers = Sale.get_top_n_fields_for_sale_type(
            df,
            field='publisher',
            sale_type='global_sales',
            n=10
        )
        top_developers = Sale.get_top_n_fields_for_sale_type(
            df,
            field='developer',
            sale_type='global_sales',
            n=10
        )

        data = {
            'description': json.loads(data_describe),
            'top_platforms': top_platforms,
            'top_genres': top_genres,
            'top_publishers': top_publishers,
            'top_developers': top_developers
        }

        return Response(data, status=status.HTTP_200_OK)
