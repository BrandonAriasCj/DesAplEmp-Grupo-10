# Generated by Django 5.1.7 on 2025-04-13 02:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookview',
            name='book',
        ),
        migrations.RemoveField(
            model_name='bookview',
            name='user',
        ),
        migrations.RemoveField(
            model_name='recommendationlog',
            name='book',
        ),
        migrations.RemoveField(
            model_name='recommendationlog',
            name='user',
        ),
        migrations.DeleteModel(
            name='AuthorAnalytics',
        ),
        migrations.DeleteModel(
            name='BookView',
        ),
        migrations.DeleteModel(
            name='RecommendationLog',
        ),
    ]
