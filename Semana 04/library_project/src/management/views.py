from django.shortcuts import render, redirect
from .forms import LibraryBranchForm, BookCopyForm, BookLoanForm, ReservationForm
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



def add_branch(request):
    if request.method == 'POST':
        form = LibraryBranchForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = LibraryBranchForm()
    return render(request, 'management/add_branch.html', {'form': form})

def add_book_copy(request):
    if request.method == 'POST':
        form = BookCopyForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = BookCopyForm()
    return render(request, 'management/add_book_copy.html', {'form': form})

def add_book_loan(request):
    if request.method == 'POST':
        form = BookLoanForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = BookLoanForm()
    return render(request, 'management/add_book_loan.html', {'form': form})

def add_reservation(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ReservationForm()
    return render(request, 'management/add_reservation.html', {'form': form})

