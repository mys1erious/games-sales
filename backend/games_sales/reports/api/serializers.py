from django.db import IntegrityError
from rest_framework import serializers
from ..models import Report


class ReportSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='user.email')
    created = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M")

    class Meta:
        model = Report
        fields = ['name', 'created', 'user', 'username', 'report_body']
        extra_kwargs = {
            'user': {'write_only': True}
        }

    def validate(self, data):
        user = data.get('user')
        name = data.get('name')

        record = Report.objects.filter(name=name, user=user).first()
        if record:
            raise serializers.ValidationError(f'Report with this name for {user} already exists.')

        return super().validate(data)
