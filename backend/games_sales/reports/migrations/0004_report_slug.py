# Generated by Django 4.1 on 2022-11-02 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0003_alter_report_report_body'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='slug',
            field=models.SlugField(default='djangodbmodelsfieldscharfield'),
        ),
    ]