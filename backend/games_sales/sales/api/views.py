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
from ..constants import TOP_FIELDS
from ..models import Sale, Game, Rating
from .serializers import SaleSerializer, TopFieldsSerializer
from ..utils import db_field_to_field, field_to_db_field, get_all_field_names, get_sales_field_names


class SaleBaseAPIView(APIView, LimitOffsetPagination):
    permission_classes = (AllowAny,)  # Change
    authentication_classes = []

    query_search_param = 'text'
    filter_params = ['genre', 'esrb_rating', 'yor_lt', 'yor_gt', 'year_of_release', 'sales']
    default_order_by = 'id'

    page_size = 8
    default_page = 1

    def get_sales(self, query_params):
        sales = Sale.objects.all()
        sales = self.search(sales, query_params)
        sales = self.filter(sales, query_params)
        sales = self.order_by(sales, query_params)
        return sales

    def search(self, sales, query_params):
        if self.query_search_param in query_params:
            return sales.search_by_text(
                query_params.get(self.query_search_param)
            )
        return sales

    def filter(self, sales, query_params):
        if any([key in self.filter_params for key in query_params]):
            return sales.filter_by_params(
                intersected_params(query_params, self.filter_params)
            )
        return sales

    def order_by(self, sales, query_params):
        return sales.order_by(field_to_db_field(
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

        self.page_size = query_params.get('page_size', self.page_size)

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
        order_by = [
            db_field_to_field(db_field)
            for db_field in get_all_field_names(
                models_list=[Sale, Game, Rating],
                exclude=('slug', 'game', 'rating', 'sale')
            )
        ]

        genres = Sale.objects.all().genres()\
            .order_by('game__genre')
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

    default_sales_type = 'global_sales'

    def get(self, request, *args, **kwargs):
        query_params = QueryDict.copy(request.query_params)
        query_params['page_size'] = '-1'

        sales_type = query_params.pop('sales_type', self.default_sales_type)
        if sales_type not in get_sales_field_names():
            sales_type = self.default_sales_type

        sales = self.get_sales(query_params)

        top_fields_data = self.get_top_fields_data(sales, sales_type)
        describe_data = sales.describe()
        score_correlation = [
            self.get_values_list(sales, 'user_score'),
            self.get_values_list(sales, 'critic_score'),
        ]

        data = {
            'description': describe_data,
            'score_correlation': score_correlation,
            **top_fields_data
        }
        return Response(data, status=status.HTTP_200_OK)

    @staticmethod
    def get_values_list(sales, field, exclude_null=True):
        db_field = field_to_db_field(field)

        if exclude_null:
            sales = sales.exclude(**{f'{db_field}__isnull': True})

        return list(sales.values_list(db_field, flat=True))

    def get_top_fields_data(self, sales, sales_type):
        top_fields_data = {}
        for field in TOP_FIELDS:
            top_fields_data[f'top_{field}s'] = self.get_top_field_data(
                sales, field, sales_type
            )
        return top_fields_data

    @staticmethod
    def get_top_field_data(sales, field, sales_type):
        top_fields = sales.top_n_fields(
            field=field,
            sales_type=sales_type,
            n=10
        )
        return TopFieldsSerializer(
            top_fields,
            field=field,
            many=True
        ).data
