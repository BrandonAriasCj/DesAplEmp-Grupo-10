from django.shortcuts import render
from .models import LibraryBranch, BookCopy, BookLoan, Reservation

def home(request):
    return render(request, 'management/home.html')

def branch_list(request):
    branches = LibraryBranch.objects.all()
    return render(request, 'management/branch_list.html', {'branches': branches})

def book_copy_list(request):
    copies = BookCopy.objects.select_related('book', 'branch')
    return render(request, 'management/book_copy_list.html', {'copies': copies})

def book_loan_list(request):
    loans = BookLoan.objects.select_related('copy__book', 'borrower')
    return render(request, 'management/book_loan_list.html', {'loans': loans})

def reservation_list(request):
    reservations = Reservation.objects.select_related('book', 'user', 'branch')
    return render(request, 'management/reservation_list.html', {'reservations': reservations})
