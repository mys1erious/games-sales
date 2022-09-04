from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Sale
from .serializers import SaleSerializer


class SaleListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
