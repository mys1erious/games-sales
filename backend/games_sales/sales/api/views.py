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
from ..utils import db_field_to_field, field_to_db_field, get_all_field_names
from ..models import Sale, Game, Rating
from .serializers import SaleSerializer, TopFieldSerializer, UserCriticScoreSerializer


class BaseSaleAPIView(APIView, LimitOffsetPagination):
    permission_classes = (IsAdminOrReadOnly,)
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


class SaleListAPIView(BaseSaleAPIView):
    def get(self, request, format=None):
        query_params = request.query_params
        sales = self.get_sales(query_params)

        self.page_size = query_params.get('page_size', self.page_size)
        if self.page_size == '-1':
            self.page_size = sales.count()

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

    def post(self, request, format=None):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaleDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminOrReadOnly,)
    authentication_classes = []

    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    lookup_field = 'slug'


class SaleFilterFieldsListAPIView(APIView):
    permission_classes = (IsAdminOrReadOnly,)
    authentication_classes = []

    def get(self, request, format=None):
        order_by = [
            db_field_to_field(db_field)
            for db_field in get_all_field_names(
                models_list=[Sale, Game, Rating],
                exclude=('slug', 'game', 'rating', 'sale')
            )
        ]

        genres = Sale.objects.all().unique_values('genre')\
            .order_by('game__genre')
        esrb_ratings = Game.ESRBRatings.names

        data = {
            'order_by': order_by,
            'genres': genres,
            'esrb_ratings': esrb_ratings
        }

        return Response(data, status=status.HTTP_200_OK)


class SaleAnalysisAPIView(APIView):
    permission_classes = (IsAdminOrReadOnly,)

    def get(self, request, format=None):
        # Add sub endpoints here
        return Response({'Base Sale Analysis Endpoint'}, status=status.HTTP_200_OK)


class BaseSaleAnalysisAPIView(BaseSaleAPIView):
    n = 10
    sales_type = 'global_sales'
    field = ''

    def get_sales(self, query_params):
        query_params = self.set_page_size_to_max(query_params)
        return super().get_sales(query_params)

    def set_page_size_to_max(self, query_params):
        query_params['page_size'] = '-1'
        return query_params

    def get_query_params(self, query_params):
        self.get_n_param(query_params)

    def get_n_param(self, query_params):
        n = query_params.pop('n', [self.n])[0]
        if n == '-1':
            self.n = -1
        elif isinstance(n, str) and n.isdigit():
            self.n = int(n)

    def get_sales_type_param(self, query_params):
        sales_type = query_params.pop(
            'sales_type',
            [self.sales_type]
        )[0]
        if sales_type in Sale.get_sales_field_names():
            self.sales_type = sales_type

    def get_field_param(self, query_params):
        field = query_params.pop('field', [''])[0]
        if field in Sale.ALLOWED_FIELD_PARAMS:
            self.field = field

    def field_param_is_valid(self):
        if self.field in Sale.ALLOWED_FIELD_PARAMS:
            return True
        return False

    def field_param_not_valid_response(self):
        return Response({
            'message':
                f'Param field=\'{self.field}\' is not in allowed fields '
                f'{Sale.ALLOWED_FIELD_PARAMS}'
        }, status=status.HTTP_400_BAD_REQUEST)


class SaleAnalysisTopFieldAPIView(BaseSaleAnalysisAPIView):
    def get(self, request, format=None):
        query_params = QueryDict.copy(request.query_params)
        self.get_query_params(query_params)
        if not self.field_param_is_valid():
            return self.field_param_not_valid_response()

        sales = self.get_sales(query_params)

        data = sales.top_n_fields(
            field=self.field,
            sales_type=self.sales_type,
            n=self.n
        )

        serializer = TopFieldSerializer(
            data,
            field=self.field,
            many=True
        )

        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def get_query_params(self, query_params):
        self.get_field_param(query_params)
        self.get_sales_type_param(query_params)
        super().get_query_params(query_params)


class SaleAnalysisDescribeAPIView(BaseSaleAnalysisAPIView):
    def get(self, request, format=None):
        query_params = QueryDict.copy(request.query_params)
        sales = self.get_sales(query_params)

        data = sales.describe()

        return Response(data, status=status.HTTP_200_OK)


class SaleAnalysisScoreAPIView(BaseSaleAnalysisAPIView):
    n = 200

    def get(self, request, format=None):
        query_params = QueryDict.copy(request.query_params)
        self.get_query_params(query_params)
        sales = self.get_sales(query_params)

        data = sales.get_fields_correlation_data(
            'user_score',
            'critic_score',
            n=self.n
        )

        serializer = UserCriticScoreSerializer(data, many=True)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class SaleAnalysisGamesAnnuallyAPIView(BaseSaleAnalysisAPIView):
    yor_lt = 2050
    yor_gt = 0

    def get(self, request, format=None):
        query_params = QueryDict.copy(request.query_params)
        self.get_query_params(query_params)
        sales = self.get_sales(query_params)

        data = sales.games_annually(yor_lt=self.yor_lt, yor_gt=self.yor_gt)

        return Response(data, status=status.HTTP_200_OK)

    def get_query_params(self, query_params):
        yor_lt = query_params.pop('yor_lt', [self.yor_lt])[0]
        if isinstance(yor_lt, str) and yor_lt.isdigit():
            self.yor_lt = int(yor_lt)
        yor_gt = query_params.pop('yor_gt', [self.yor_gt])[0]
        if isinstance(yor_gt, str) and yor_gt.isdigit():
            self.yor_gt = int(yor_gt)

        super().get_query_params(query_params)


class SaleAnalysisGamesByFieldAPIView(BaseSaleAnalysisAPIView):
    n = 5

    def get(self, request, format=None):
        query_params = QueryDict.copy(request.query_params)
        self.get_query_params(query_params)
        if not self.field_param_is_valid():
            return self.field_param_not_valid_response()

        sales = self.get_sales(query_params)

        data = sales.top_games_by_field(
            field=self.field,
            sales_type=self.sales_type,
            n=self.n
        )

        return Response(data, status=status.HTTP_200_OK)

    def get_query_params(self, query_params):
        self.get_field_param(query_params)
        self.get_sales_type_param(query_params)
        return super().get_query_params(query_params)
