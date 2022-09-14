from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from core.permissions import IsAdminOrReadOnly
from ..models import Sale
from .serializers import SaleSerializer


class SaleListAPIView(APIView, LimitOffsetPagination):
    permission_classes = (AllowAny, )
    authentication_classes = []
    page_size = 5

    def get(self, request, *args, **kwargs):
        query_params = request.query_params
        sales = Sale.objects.all().select_related('game', 'game__rating').order_by('id')

        if 'page' in request.query_params:
            page_number = query_params.get('page')
        else:
            page_number = 1

        paginator = Paginator(sales, self.page_size)
        try:
            paginator_page = paginator.page(page_number)
        except (PageNotAnInteger, EmptyPage) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SaleSerializer(
            paginator_page,
            many=True,
            context={'request', request}
        )

        # Better way to get num_pages without passing it with each request?
        return Response({
            'sales': serializer.data,
            'num_pages': paginator.num_pages
        }, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaleDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    lookup_field = 'slug'
