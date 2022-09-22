from django.db import models
from django.db.models import Q
from django.utils.text import slugify

from core.utils import is_int


class Rating(models.Model):
    critic_score = models.FloatField(
        help_text='Aggregate score compiled by Metacritic staff.',
        null=True, blank=True)
    critic_count = models.FloatField(
        help_text='The number of critics used in coming up with the Critic_score.',
        null=True, blank=True)
    user_score = models.FloatField(
        help_text='Score by Metacritic`s subscribers.',
        null=True, blank=True)
    user_count = models.FloatField(
        help_text='Number of users who gave the user_score.',
        null=True, blank=True)

    def __str__(self):
        try:
            game = Game.objects.get(rating=self)
        except Game.DoesNotExist:
            game = 'undefined'

        return f'Rating for {game}'


class GameManager(models.Manager):
    def create(self, **kwargs):
        rating = Rating(
            critic_score=kwargs.get('critic_score', None),
            critic_count=kwargs.get('critic_count', None),
            user_score=kwargs.get('user_score', None),
            user_count=kwargs.get('user_count', None)
        )
        rating.save()

        game = Game(
            name=kwargs.get('name'),
            platform=kwargs.get('platform', ''),
            publisher=kwargs.get('publisher', ''),
            developer=kwargs.get('developer', ''),
            genre=kwargs.get('genre', ''),
            year_of_release=kwargs.get('year_of_release', None),
            esrb_rating=kwargs.get('esrb_rating', ''),
            rating=rating
        )
        game.save()

        return game


class Game(models.Model):
    class ESRBRatings(models.TextChoices):
        KA = 'K-A', 'Kids to Adults, 6+'
        M = 'M', 'Mature, 17+'
        RP = 'RP', 'Rating Pending'
        E = 'E', 'Everyone'
        AO = 'AO', 'Adults Only, 18+'
        E10PLUS = 'E10+', 'Everyone 10+'
        EC = 'EC', 'Early Childhood, 3+'
        T = 'T', 'Teen, 13+'

    slug = models.SlugField(
        unique=True, blank=True,
        max_length=120
    )
    name = models.CharField(max_length=120)

    platform = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    publisher = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    developer = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    genre = models.CharField(
        max_length=30,
        null=True, blank=True
    )

    year_of_release = models.IntegerField(null=True, blank=True)
    rating = models.OneToOneField(
        to=Rating,
        on_delete=models.SET_NULL,
        null=True
    )
    esrb_rating = models.CharField(
        max_length=4,
        null=True, blank=True,
        choices=ESRBRatings.choices
    )

    objects = GameManager()

    def save(self, *args, **kwargs):
        self.slug = f'{slugify(self.name)}-{slugify(self.platform)}'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'


class SaleManager(models.Manager):
    def create(self, **kwargs):
        sales_data = {
            'NA_sales': kwargs.pop('NA_sales', None),
            'EU_sales': kwargs.pop('EU_sales', None),
            'JP_sales': kwargs.pop('JP_sales', None),
            'other_sales': kwargs.pop('other_sales', None),
            'global_sales': kwargs.pop('global_sales', None)
        }

        game = Game.objects.create(**kwargs)

        sale = Sale(game=game, **sales_data)
        sale.save()

        return sale

    def all(self):
        return super().all().select_related('game', 'game__rating')


class Sale(models.Model):
    slug = models.SlugField(
        unique=True, blank=True,
        max_length=120
    )
    game = models.OneToOneField(
        to=Game,
        on_delete=models.CASCADE
    )

    NA_sales = models.FloatField(
        help_text='In millions of units',
        null=True, blank=True
    )
    EU_sales = models.FloatField(
        help_text='In millions of units',
        null=True, blank=True
    )
    JP_sales = models.FloatField(
        help_text='In millions of units',
        null=True, blank=True
    )
    other_sales = models.FloatField(
        help_text='Sales in the rest of the world, i.e. Africa, Asia '
                  'excluding Japan, Australia(in millions of units)',
        null=True, blank=True
    )
    global_sales = models.FloatField(
        help_text='Total Sales in the world (in millions of units)',
        null=True, blank=True
    )

    objects = SaleManager()

    @staticmethod
    def get_all_genres():
        return Sale.objects.order_by().values_list('game__genre', flat=True).distinct()

    @staticmethod
    def order_by_mapping(value, default='id'):
        if not value:
            value = default

        in_reverse = False
        if value[0] == '-':
            value = value[1:]
            in_reverse = True

        game_fields = ['name', 'platform', 'publisher', 'developer', 'genre', 'esrb_rating']
        rating_fields = ['critic_score', 'critic_count', 'user_score', 'user_count']
        sale_fields = ['id', 'EU_sales', 'JP_sales', 'NA_sales', 'global_sales', 'other_sales']

        if value in game_fields:
            value = f'game__{value}'
        elif value in rating_fields:
            value = f'game__rating__{value}'
        elif value in sale_fields:
            pass

        if in_reverse:
            value = f'-{value}'

        return value

    @staticmethod
    def filter_by_params(sales, params):
        filters_map = {
            'genre': lambda: sales.filter(
                Q(game__genre__contains=params['genre'])),
            'esrb_rating': lambda: sales.filter(
                Q(game__esrb_rating__contains=params['esrb_rating'])),
            'yor_lt': lambda: sales.filter(
                Q(game__year_of_release__lt=int(params['yor_lt']))),
            'yor_gt': lambda: sales.filter(
                Q(game__year_of_release__gt=int(params['yor_gt'])))
        }
        for param in params:
            sales = filters_map[param]()

        return sales

    @staticmethod
    def search_by_text(sales, text):
        # Add ability to search with whitespace (split by ' ' or sth)
        if is_int(text):
            return sales.filter(game__year_of_release__exact=int(text))

        return sales.filter(
            Q(game__name__icontains=text) |
            Q(game__platform__icontains=text) |
            Q(game__publisher__icontains=text) |
            Q(game__developer__icontains=text) |
            Q(game__genre__icontains=text)
        )

    def save(self, *args, **kwargs):
        self.slug = f'{self.game.slug}-sales'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'sale: {self.game.name}'
