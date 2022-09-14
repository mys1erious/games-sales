from rest_framework import serializers

from ..models import Account, PasswordConfirmError


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
            return self.Meta.model.objects.create_user(**validated_data)
        except PasswordConfirmError as e:
            errors['password'] = [e]
            raise serializers.ValidationError(errors)
