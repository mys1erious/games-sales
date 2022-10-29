from django.db import models
from django.apps import apps
from django.db.models.base import ModelBase


def db_field_to_field(db_field):
    return db_field.split('__')[-1]\
        .replace('_', ' ')\
        .title()


def cut_db_field(db_field):
    return db_field.split('__')[-1]


def field_to_db_field(field):
    Game = apps.get_model('sales.Game')
    Rating = apps.get_model('sales.Rating')
    game_fields = get_all_field_names(Game)
    rating_fields = get_all_field_names(Rating)

    in_reverse = False
    if field and field[0] == '-':
        field = field[1:]
        in_reverse = True

    field = field.replace(' ', '_').lower()

    if field in game_fields:
        field = f'game__{field}'
    elif field in rating_fields:
        field = f'game__rating__{field}'

    if in_reverse:
        field = f'-{field}'

    return field


def get_all_field_names(models_list, exclude=()):
    if isinstance(models_list, ModelBase):
        models_list = [models_list]
    exclude += ('id',)

    return [
        field.name
        for model in models_list
        for field in model._meta.get_fields()
        if field.name not in exclude
    ]


def get_numeric_field_names(models_list, exclude=()):
    exclude += ('id',)

    fields = []
    for model in models_list:
        for field in model._meta.get_fields():
            if isinstance(field, (models.FloatField, models.IntegerField)) and\
                    field.name not in exclude:
                fields.append(field.name)
    return fields
