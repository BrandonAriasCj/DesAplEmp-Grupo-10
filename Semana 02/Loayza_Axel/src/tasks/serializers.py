from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class MEta:
        model= Task
        fields = ['title', 'description', 'status']
