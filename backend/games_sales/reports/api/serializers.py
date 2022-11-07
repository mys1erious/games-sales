from django.db import IntegrityError
from rest_framework import serializers
from ..models import Report


class ReportSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='user.email')
    created = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M")
    report = serializers.SerializerMethodField('get_report_url', read_only=True)

    class Meta:
        model = Report
        fields = ['name', 'slug', 'username', 'created', 'report', 'user', 'report_body']
        extra_kwargs = {
            'user': {'write_only': True},
            'report_body': {'write_only': True},
            'slug': {'read_only': True}
        }

    def get_report_url(self, obj):
        request = self.context.get('request')
        if request:
            url = obj.report_body.url
            return request.build_absolute_uri(url)

    def validate(self, data):
        user = data.get('user')
        name = data.get('name')

        if Report.objects.filter(name=name, user=user).first():
            raise serializers.ValidationError(f'Report with this name for {user} already exists.')

        return super().validate(data)
