from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Sale
from .serializers import SaleSerializer


class SaleListAPIView(APIView, LimitOffsetPagination):
    page_size = 3

    def get(self, request, *args, **kwargs):
        query_params = request.query_params
        sales = Sale.objects.all().order_by('id')

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
