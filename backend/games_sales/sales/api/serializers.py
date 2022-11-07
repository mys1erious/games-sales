from abc import ABC

from rest_framework import serializers
from ..models import Sale, Game, Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['critic_score', 'critic_count', 'user_score', 'user_count']


class GameSerializer(serializers.ModelSerializer):
    rating = RatingSerializer(many=False)

    class Meta:
        model = Game
        fields = [
            'slug', 'name', 'platform', 'publisher', 'developer',
            'genre', 'year_of_release', 'esrb_rating', 'rating'
        ]
        extra_kwargs = {
            'slug': {'read_only': True}
        }


class SaleSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    class Meta:
        model = Sale
        fields = ['slug', 'game', 'na_sales', 'eu_sales', 'jp_sales', 'other_sales', 'global_sales']
        extra_kwargs = {
            'slug': {'read_only': True}
        }

    def create(self, validated_data):
        game_data = validated_data.pop('game')
        rating_data = game_data.pop('rating')
        return Sale.objects.create(
            **validated_data,
            **game_data,
            **rating_data
        )


class UserCriticScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user_score', 'critic_score']


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        # Deletes all fields that weren't passed as fields kwarg
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class TopFieldSerializer(DynamicFieldsModelSerializer):
    sales = serializers.FloatField()

    class Meta:
        model = Game
        fields = ['sales'] + Sale.ALLOWED_FIELD_PARAMS


class GamesAnnuallySerializer(serializers.ModelSerializer):
    count = serializers.FloatField()

    class Meta:
        model = Game
        fields = ['year_of_release', 'count']


class DescribeNumericDataSerializer(serializers.Serializer):
    count = serializers.FloatField()
    mean = serializers.FloatField()
    std = serializers.FloatField()
    min = serializers.FloatField()
    p25 = serializers.FloatField()
    p50 = serializers.FloatField()
    p75 = serializers.FloatField()
    max = serializers.FloatField()


class DynamicFieldsSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        """
        Creates fields with name of :arg field_names:
            of type :arg field: or :arg fields:
        eg: DynamicFieldsSerializer(
                field_names=['field1', 'field2'],
                field=DescribeNumericDataSerializer
            )
            will create DynamicFieldsSerializer only with 2 fields:
                field1=DescribeNumericDataSerializer(),
                field2=DescribeNumericDataSerializer()
        """
        field_names = kwargs.pop('field_names', [])
        fields = kwargs.pop('fields', [])
        field = kwargs.pop('field', None)

        super().__init__(*args, **kwargs)

        if field:
            for name in field_names:
                self.fields.__setitem__(name, field())
        else:
            for name, field in zip(field_names, fields):
                self.fields.__setitem__(name, field())


# Probably bad implementation but i didnt find a better way to make these serializers
#   so for now leaving as it is
# Need to inherit, otherwise it rewrites the fields on DynamicFieldsSerializer itself
#   and i cant use it with different instantiations
class DescribeDynamicFieldsSerializer(DynamicFieldsSerializer):
    ...


class GamesByFiedlDynamicFieldsSerializer(DynamicFieldsSerializer):
    ...


class GamesByFieldGameSerializer(serializers.Serializer):
    name = serializers.CharField()
    sales = serializers.FloatField()
