from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics, permissions
from .models import Profile, QuizAttempt
from .serializers import ProfileSerializer, QuizAttemptSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    """Vista para obtener y actualizar el perfil del usuario autenticado"""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class QuizAttemptListView(generics.ListAPIView):
    """Vista para listar los intentos de cuestionarios del usuario autenticado"""
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuizAttempt.objects.filter(user=self.request.user)
