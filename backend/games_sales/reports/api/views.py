from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Report
from .serializers import ReportSerializer


class UserReportsAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        request=ReportSerializer(many=True),
        responses={
            200: ReportSerializer(many=True),
            400: None
        }
    )
    def get(self, request, format=None):
        """
        List of all User Reports
        """
        reports = Report.objects.all().filter(user=request.user)
        serializer = ReportSerializer(
            reports, many=True,
            context={'request': request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=ReportSerializer,
        responses={
            200: ReportSerializer,
            400: None
        }
    )
    def post(self, request, format=None):
        """
        Create new Report object
        """
        request.data._mutable = True
        request.data['user'] = request.user.id
        request.data._mutable = False

        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=ReportSerializer,
    responses={
        200: ReportSerializer,
        400: None
    }
)
class UserReportDetailAPIView(APIView):
    error_msg = {'detail': 'Not found.'}
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug, format=None):
        """
        Retrieve a Report
        """
        report = get_object_or_404(Report, user=request.user, slug=slug)

        serializer = ReportSerializer(report, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, slug, format=None):
        """
        Delete a Report
        """
        report = get_object_or_404(Report, user=request.user, slug=slug)
        report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
