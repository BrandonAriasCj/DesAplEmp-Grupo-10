from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views
from .views import register,CustomLoginView,edit_profile,create_reading_list,submit_review,edit_reading_list,delete_reading_list,add_to_reading_list,toggle_book

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(next_page="home"), name="logout"),  
    path("reading-list/create/", create_reading_list, name="create_reading_list"),
    path("reading-list/edit/<int:list_id>/", edit_reading_list, name="edit_reading_list"),
    path("reading-list/delete/<int:list_id>/", delete_reading_list, name="delete_reading_list"),
    path("register/", register, name="register"),
    path("custom_redirect/", views.custom_redirect, name="custom_redirect"),
    path("profile/edit/", edit_profile, name="edit_profile"),
    path("book/<int:book_id>/review/", submit_review, name="submit_review"),
    path("book/<int:book_id>/add-to-list/", add_to_reading_list, name="add_to_reading_list"),
    path("profile/<int:user_id>/", views.user_profile, name="user_profile"),
    path("reading-list/create/", create_reading_list, name="create_reading_list"),
    path("reading-list/<int:list_id>/", views.reading_list_view, name="reading_list"),
    path("book-reviews/", views.book_review_list, name="book_reviews"),
    path("borrowing-history/<int:user_id>/", views.borrowing_history, name="borrowing_history"),
    path("reading-list/toggle/<int:list_id>/<int:book_id>/", toggle_book, name="toggle_book"),


]
