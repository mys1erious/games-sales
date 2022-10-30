from django.db import models
from django.db.models import Q, QuerySet, F, Sum, Count, Max, Avg, StdDev, Min, Aggregate
from django.utils.text import slugify

from core.utils import is_int
from .utils import field_to_db_field, get_numeric_field_names, cut_db_field


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


class SaleQuerySet(QuerySet):
    def search_by_text(self, text):
        if is_int(text):
            return self.filter(game__year_of_release__exact=int(text))

        return self.filter(
            Q(game__name__icontains=text) |
            Q(game__platform__icontains=text) |
            Q(game__publisher__icontains=text) |
            Q(game__developer__icontains=text) |
            Q(game__genre__icontains=text)
        )

    def filter_by_params(self, params):
        qs = self

        filters_map = {
            'genre': lambda: qs.filter(
                Q(game__genre__icontains=params['genre'])),
            'esrb_rating': lambda: qs.filter(
                Q(game__esrb_rating__icontains=params['esrb_rating'])),
            'yor_lt': lambda: qs.filter(
                Q(game__year_of_release__lt=int(params['yor_lt']))),
            'yor_gt': lambda: qs.filter(
                Q(game__year_of_release__gt=int(params['yor_gt']))),
            'year_of_release': lambda: qs.filter(
                Q(game__year_of_release__exact=int(params['year_of_release'])))
        }
        for param in params:
            qs = filters_map[param]()
        return qs

    def unique_values(self, field):
        return self.order_by() \
            .values_list(field_to_db_field(field), flat=True) \
            .distinct()

    def top_n_fields(
            self,
            field,
            n=10,
            sales_type='global_sales'):
        db_field = field_to_db_field(field)

        if n == -1:
            n = self.values(db_field).distinct().count()

        return self.values(**{field: F(db_field)}) \
                   .exclude(**{f'{field}__isnull': True}) \
                   .annotate(sales=Sum(sales_type)) \
                   .order_by('-sales')[:n]

    def get_fields_correlation_data(self, field1, field2, n=300):
        user_db_field = field_to_db_field(field1)
        critic_db_field = field_to_db_field(field2)

        if n == -1:
            n = self.all().count()

        return self.exclude(
            Q(**{f'{user_db_field}__isnull': True}) |
            Q(**{f'{critic_db_field}__isnull': True})) \
                   .values(**{
            field1: F(user_db_field),
            field2: F(critic_db_field)})[:n]

    def describe(self):
        # Generate descriptive statistics
        # Similar to pandas df.describe()

        fields = get_numeric_field_names([Sale, Game, Rating])
        db_fields = [field_to_db_field(field) for field in fields]

        data = {}

        for db_field in db_fields:
            data[cut_db_field(db_field)] = self.describe_field(db_field)

        return data

    def describe_field(self, db_field):
        return self.aggregate(
            count=Count(db_field),
            mean=Avg(db_field),
            std=StdDev(db_field),
            min=Min(db_field),
            p25=Percentile(db_field, percentile=0.25),
            p50=Percentile(db_field, percentile=0.5),
            p75=Percentile(db_field, percentile=0.75),
            max=Max(db_field)
        )

    def games_annually(self, yor_lt=2050, yor_gt=0):
        field = 'year_of_release'
        db_field = field_to_db_field(field)

        data = self.values(**{field: F(db_field)}) \
            .exclude(**{f'{db_field}__isnull': True}) \
            .filter(**{
            f'{db_field}__lt': yor_lt,
            f'{db_field}__gt': yor_gt})\
            .annotate(count=Count(db_field)) \
            .order_by(field)

        return data

    def top_games_by_field(self, field, sales_type='global_sales', n=5):
        db_field = field_to_db_field(field)
        values = Sale.objects.all().unique_values(field)
        data = {value: [] for value in values}

        if n == -1:
            n = self.all().count()

        qs = self.values(
            **{field: F(db_field)},
            name=F('game__name'),
            sales=F(sales_type)
        )

        res = qs.none()
        for value in values:
            res = res.union(
                qs.filter(**{db_field: value})\
                .order_by('-sales')[:n]
            )
        res = res.order_by(field, '-sales')

        for obj in res:
            data[obj[field]].append({'name': obj['name'], 'sales': obj['sales']})

        return data


class SaleManager(models.Manager):
    _queryset_class = SaleQuerySet

    def create(self, **kwargs):
        sales_data = {
            'na_sales': kwargs.pop('na_sales', None),
            'eu_sales': kwargs.pop('eu_sales', None),
            'jp_sales': kwargs.pop('jp_sales', None),
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
    ALLOWED_FIELD_PARAMS = ['platform', 'genre', 'publisher', 'developer', 'esrb_rating']

    slug = models.SlugField(
        unique=True, blank=True,
        max_length=120
    )
    game = models.OneToOneField(
        to=Game,
        on_delete=models.CASCADE
    )

    na_sales = models.FloatField(
        help_text='In millions of units',
        null=True, blank=True
    )
    eu_sales = models.FloatField(
        help_text='In millions of units',
        null=True, blank=True
    )
    jp_sales = models.FloatField(
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
    def get_sales_field_names():
        return [
            field.name
            for field in Sale._meta.get_fields()
            if 'sales' in field.name
        ]

    def save(self, *args, **kwargs):
        self.slug = f'{self.game.slug}-sales'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'sale: {self.game.name}'


class Percentile(Aggregate):
    def __init__(self, *args, **kwargs):
        percentile = kwargs.pop("percentile", 0.5)
        self.template = f'%(function)s({percentile}) WITHIN GROUP (ORDER BY %(expressions)s)'
        super().__init__(*args, **kwargs)

    function = 'PERCENTILE_CONT'
    name = 'median'
    output_field = models.FloatField()
