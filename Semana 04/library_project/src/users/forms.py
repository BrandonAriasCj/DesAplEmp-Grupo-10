from django import forms
from .models import LibraryUser ,ReadingList, LibraryUser,BookReview


class LibraryUserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = LibraryUser
        fields = ["username", "email", "password", "bio", "profile_image"]

class LibraryUserEditForm(forms.ModelForm):
    class Meta:
        model = LibraryUser
        fields = ["bio", "profile_image"]        

class ReadingListForm(forms.ModelForm):
    class Meta:
        model = ReadingList
        fields = ["name", "description", "is_public", "books", "genres"]
        widgets = {
            "books": forms.SelectMultiple(attrs={"class": "form-control"}),  # 🔹 Selección múltiple
            "genres": forms.SelectMultiple(attrs={"class": "form-control"}),
        }

class BookReviewForm(forms.ModelForm):
    class Meta:
        model = BookReview
        fields = ["rating", "comment"]
        widgets = {
            "rating": forms.Select(choices=[(i, f"{i} ⭐") for i in range(1, 6)]),
            "comment": forms.Textarea(attrs={"rows": 3, "placeholder": "Escribe tu opinión..."})
        }