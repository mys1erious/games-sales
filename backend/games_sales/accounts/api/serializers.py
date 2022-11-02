from django.core.exceptions import ValidationError as DjangoValidationError
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from rest_framework import serializers

from ..models import Account, PasswordConfirmError


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Example',
            value={
                'email': 'your.email@mail.com',
                'username': 'your_username',
                'password': 'your_password',
                'password_confirmation': 'your_password'
            },
            request_only=True
        ),
        OpenApiExample(
            'Example',
            value={
                'email': 'your.email@mail.com',
                'username': 'your_username'
            },
            response_only=True
        ),
    ],
)
class UserSignUpSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(label='Confirm Password', write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'password_confirmation']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        errors = {}

        try:
            return self.Meta.model.objects.create_user(
                **validated_data,
                social_login=False
            )
        except PasswordConfirmError as e:
            errors['password'] = [e]
            raise serializers.ValidationError(errors)
        except DjangoValidationError as e:
            errors['password'] = [e]
            raise serializers.ValidationError(errors)
