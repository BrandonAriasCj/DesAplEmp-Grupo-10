from django.urls import path
from . import views
from .views import register,CustomLoginView

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("register/", register, name="register"),
    path("profile/<int:user_id>/", views.user_profile, name="user_profile"),
    path("reading-list/<int:list_id>/", views.reading_list_view, name="reading_list"),
    path("book-reviews/", views.book_review_list, name="book_reviews"),
    path("borrowing-history/<int:user_id>/", views.borrowing_history, name="borrowing_history"),

]
