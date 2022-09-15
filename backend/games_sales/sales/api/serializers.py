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


class SaleSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    class Meta:
        model = Sale
        fields = ['slug', 'game', 'NA_sales', 'EU_sales', 'JP_sales', 'other_sales', 'global_sales']

    def create(self, validated_data):
        game_data = validated_data.pop('game')
        rating_data = game_data.pop('rating')
        return Sale.objects.create(
            **validated_data,
            **game_data,
            **rating_data
        )
