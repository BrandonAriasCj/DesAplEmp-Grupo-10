from django import forms
from .models import LibraryUser ,ReadingList, LibraryUser


class LibraryUserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = LibraryUser
        fields = ["username", "email", "password", "bio", "profile_image"]

class ReadingListForm(forms.ModelForm):
    class Meta:
        model = ReadingList
        fields = ['name', 'description', 'books', 'is_public']