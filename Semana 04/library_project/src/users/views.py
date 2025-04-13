from django.shortcuts import render,redirect, get_object_or_404
from .models import LibraryUser, ReadingList, BookReview
from django.contrib.auth import login
from library.models import Book
from .models import LibraryUser, ReadingList
from .forms import LibraryUserRegistrationForm , ReadingListForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView


class CustomLoginView(LoginView):
    template_name = "users/login.html"

def user_profile(request, user_id):
    """Vista del perfil de usuario con favoritos y progreso."""
    user = get_object_or_404(LibraryUser, id=user_id)
    return render(request, "users/profile.html", {"user": user})

def reading_list_view(request, list_id):
    """Vista para mostrar una lista de lectura específica."""
    reading_list = get_object_or_404(ReadingList, id=list_id)
    return render(request, "users/reading_list.html", {"reading_list": reading_list})

def book_review_list(request):
    """Vista para mostrar todas las reseñas de libros."""
    reviews = BookReview.objects.all()
    return render(request, "users/book_reviews.html", {"reviews": reviews})

def borrowing_history(request, user_id):
    """Vista para mostrar el historial de préstamos de un usuario"""
    user = get_object_or_404(LibraryUser, id=user_id)
    borrowed_books = user.reading_lists.filter(is_public=True)
    return render(request, "users/borrowing_history.html", {"user": user, "borrowed_books": borrowed_books})

def register(request):
    if request.method == "POST":
        form = LibraryUserRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Iniciar sesión automáticamente después del registro
            return redirect("user_profile", user_id=user.id)
    else:
        form = LibraryUserRegistrationForm()
    return render(request, "users/register.html", {"form": form})

@login_required
def create_reading_list(request):
    """Vista para que un usuario cree una nueva lista de lectura"""
    if request.method == "POST":
        form = ReadingListForm(request.POST)
        if form.is_valid():
            reading_list = form.save(commit=False)
            reading_list.user = request.user
            reading_list.save()
            form.save_m2m()  # Guarda los libros seleccionados
            return redirect("reading_list_detail", list_id=reading_list.id)
    else:
        form = ReadingListForm()
    return render(request, "users/create_reading_list.html", {"form": form})