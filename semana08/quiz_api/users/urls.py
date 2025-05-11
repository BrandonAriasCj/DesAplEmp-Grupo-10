from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProfileView,QuizAttemptListView

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('attempts/', QuizAttemptListView.as_view(), name='quiz_attempts'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
