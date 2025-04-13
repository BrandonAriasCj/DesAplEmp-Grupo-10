from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    path('analytics/', views.category_analytics_view, name="category_analytics")
]