from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from django.urls import reverse

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes


from .serializers import UserSignUpSerializer
from ..models import Account
from ..utils import send_email


@extend_schema(
    request=UserSignUpSerializer,
    responses={
        201: UserSignUpSerializer,
        400: None
    }
)
class UserSignUpAPIView(APIView):
    """
    Registration
    """
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        data = {'message': ''}

        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = default_token_generator.make_token(user)

            response_msg = self.send_verification_email(request, user, token)
            data['message'] = response_msg
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, request, user, token):
        confirm_url = self.get_confirm_url(request, token, user)
        email_body = f'Hi {user.email}. Use the link below to verify your email \n{confirm_url}'

        email_data = {
            'email_body': email_body,
            'email_subject': 'Verify your email.',
            'to_email': user.email
        }

        send_email(email_data)
        return 'Verification link has been sent to your email.'

    def get_confirm_url(self, request, token, user):
        # Remove 'email' param ?
        current_site = get_current_site(request).domain
        relative_link = reverse('api:confirm_email')
        return f'http://{current_site + relative_link}?token={token}&email={user.email}'


@extend_schema(
    responses={200: None, 400: None}
)
class UserConfirmEmailAPIView(APIView):
    """
    Email confirmation
    """
    permission_classes = (AllowAny, )

    def get(self, request):
        data = {'message': ''}
        token = request.GET.get('token')
        email = request.GET.get('email')

        user = get_object_or_404(Account, email=email)

        verified, data['message'] = user.verify(token)
        if verified:
            return Response(data, status=status.HTTP_200_OK)
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
