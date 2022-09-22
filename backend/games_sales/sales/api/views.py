from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q

from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from core.permissions import IsAdminOrReadOnly
from core.utils import intersected_params
from ..models import Sale
from .serializers import SaleSerializer


class SaleListAPIView(APIView, LimitOffsetPagination):
    permission_classes = (AllowAny, )
    authentication_classes = []

    query_search_param = 'text'
    filter_params = ['genre', 'esrb_rating', 'yor_lt', 'yor_gt']
    default_order_by = 'id'

# publisher, developer, genre, esrb_rating, your, Rating, region sales

    page_size = 5
    default_page = 1

    def get(self, request, *args, **kwargs):
        query_params = request.query_params

        sales = Sale.objects.all()
        sales = self.search(sales, query_params)
        sales = self.filter(sales, query_params)
        sales = self.order_by(sales, query_params)

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


class SaleDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    lookup_field = 'slug'


class SaleGenreListAPIView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        genres = Sale.get_all_genres()

        return Response(genres, status=status.HTTP_200_OK)
