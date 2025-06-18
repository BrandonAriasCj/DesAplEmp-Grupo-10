from rest_framework import serializers
from .models import Category, Series
from django.contrib.auth.models import User
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['cod', 'nom']

class SeriesSerializer(serializers.ModelSerializer):
    cat = serializers.SlugRelatedField(slug_field='nom', queryset=Category.objects.all())

    class Meta:
        model = Series
        fields = ['cod', 'nom', 'cat', 'img']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
