from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, QuizAttempt

class UserSerializer(serializers.ModelSerializer):
    """Serializer para el modelo User"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer para el perfil de usuario"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'avatar', 'role', 'created_at']

class QuizAttemptSerializer(serializers.ModelSerializer):
    """Serializer para los intentos de cuestionarios"""
    quiz_title = serializers.ReadOnlyField(source='quiz.title')

    class Meta:
        model = QuizAttempt
        fields = ['id', 'quiz_title', 'score', 'max_score', 'success_rate', 'completed_at']
