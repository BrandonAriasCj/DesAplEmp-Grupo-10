from rest_framework import serializers
from .models import Category, Series

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['cod', 'nom']

class SeriesSerializer(serializers.ModelSerializer):
    cat = serializers.SlugRelatedField(slug_field='nom', queryset=Category.objects.all())

    class Meta:
        model = Series
        fields = ['cod', 'nom', 'cat', 'img']

