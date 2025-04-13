from django import forms
from .models import LibraryUser

class LibraryUserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = LibraryUser
        fields = ["username", "email", "password", "bio", "profile_image"]
