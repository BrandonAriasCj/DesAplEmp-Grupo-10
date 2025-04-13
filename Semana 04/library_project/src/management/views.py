from django.shortcuts import render
from .models import LibraryBranch, BookCopy, BookLoan, Reservation

def home(request):
    branches = LibraryBranch.objects.all()
    book_copies = BookCopy.objects.select_related('book', 'branch')
    active_loans = BookLoan.objects.filter(status='active').select_related('copy__book', 'borrower')
    reservations = Reservation.objects.select_related('book', 'user', 'branch')

    context = {
        'branches': branches,
        'book_copies': book_copies,
        'active_loans': active_loans,
        'reservations': reservations,
    }

    return render(request, 'management/home.html', context)


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
