from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SeriesViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'series', SeriesViewSet)

urlpatterns = [
    path('', include(router.urls)),  
]