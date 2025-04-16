# management/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='management_home'),
    path('branches/', views.branch_list, name='branch_list'),
    path('copies/', views.book_copy_list, name='book_copy_list'),
    path('loans/', views.book_loan_list, name='book_loan_list'),
    path('reservations/', views.reservation_list, name='reservation_list'),
    path('add-branch/', views.add_branch, name='add_branch'),
    path('add-book-copy/', views.add_book_copy, name='add_book_copy'),
    path('add-book-loan/', views.add_book_loan, name='add_book_loan'),
    path('add-reservation/', views.add_reservation, name='add_reservation'),
]

