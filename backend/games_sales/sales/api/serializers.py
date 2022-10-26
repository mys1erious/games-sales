from rest_framework import serializers

from ..constants import TOP_FIELDS
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


class SaleSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    class Meta:
        model = Sale
        fields = ['slug', 'game', 'na_sales', 'eu_sales', 'jp_sales', 'other_sales', 'global_sales']

    def create(self, validated_data):
        game_data = validated_data.pop('game')
        rating_data = game_data.pop('rating')
        return Sale.objects.create(
            **validated_data,
            **game_data,
            **rating_data
        )


class TopFieldsSerializer(serializers.ModelSerializer):
    count = serializers.FloatField()

    def __init__(self, *args, **kwargs):
        field = kwargs.pop('field', None)

        super().__init__(*args, **kwargs)

        if field is not None:
            allowed = {field, 'count'}
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        model = Game
        fields = ['count'] + TOP_FIELDS
