from django import forms
from .models import LibraryBranch, BookCopy, BookLoan, Reservation

class LibraryBranchForm(forms.ModelForm):
    class Meta:
        model = LibraryBranch
        fields = '__all__'

class BookCopyForm(forms.ModelForm):
    class Meta:
        model = BookCopy
        fields = '__all__'

class BookLoanForm(forms.ModelForm):
    class Meta:
        model = BookLoan
        fields = '__all__'

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = '__all__'
