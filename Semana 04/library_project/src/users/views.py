from django.shortcuts import render,redirect, get_object_or_404
from .models import LibraryUser, ReadingList, BookReview,Book
from django.contrib.auth import login
from library.models import Book
from .models import LibraryUser, ReadingList
from .forms import LibraryUserRegistrationForm , ReadingListForm ,LibraryUserEditForm , BookReviewForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView


class CustomLoginView(LoginView):
    template_name = "users/login.html"

@login_required
def edit_profile(request):
    """Permitir al usuario editar su perfil"""
    if request.method == "POST":
        form = LibraryUserEditForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect(f"/users/profile/{request.user.id}/")  # Redirigir al perfil
    else:
        form = LibraryUserEditForm(instance=request.user)

    return render(request, "users/edit_profile.html", {"form": form})


@login_required
def reading_list_view(request, list_id):
    """Vista segura para mostrar una lista de lectura específica"""
    reading_list = get_object_or_404(ReadingList, id=list_id)

    if not reading_list.is_public and request.user != reading_list.user:
        return redirect(f"/users/profile/{request.user.id}/")  # 🔐 Redirigir si no es dueño

    return render(request, "users/reading_list.html", {"reading_list": reading_list})

def book_review_list(request):
    """Vista para mostrar todas las reseñas de libros"""
    reviews = BookReview.objects.all().order_by("-created_at")  # 🔹 Ordenar por fecha más reciente
    return render(request, "users/book_reviews.html", {"reviews": reviews})


@login_required
def borrowing_history(request, user_id):
    """Vista segura para mostrar el historial de préstamos de un usuario"""
    if request.user.id != user_id:
        return redirect(f"/users/borrowing-history/{request.user.id}/")  # 🔐 Redirigir al historial propio

    user = get_object_or_404(LibraryUser, id=user_id)
    borrowed_books = user.reading_lists.filter(is_public=True)  # Solo listas públicas

    return render(request, "users/borrowing_history.html", {"user": user, "borrowed_books": borrowed_books})



def register(request):
    if request.method == "POST":
        form = LibraryUserRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])  # 🔹 Encripta la contraseña
            user.save()
            login(request, user)  # 🔹 Inicia sesión automáticamente después de registrarse
            return redirect("user_profile", user_id=user.id)
    else:
        form = LibraryUserRegistrationForm()
    return render(request, "users/register.html", {"form": form})

@login_required
def submit_review(request, book_id):
    """Permitir a los usuarios enviar una reseña de un libro"""
    book = Book.objects.get(id=book_id)
    
    if request.method == "POST":
        form = BookReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = request.user
            review.book = book
            review.save()
            return redirect("book_detail", pk=book.id)  


    else:
        form = BookReviewForm()

    return render(request, "users/submit_review.html", {"form": form, "book": book})

@login_required
def user_profile(request, user_id):
    """Vista restringida para que cada usuario solo vea su propio perfil"""
    if request.user.id != user_id:
        return redirect(f"/users/profile/{request.user.id}/")  # 🔐 Redirige al perfil del usuario logueado

    user = get_object_or_404(LibraryUser, id=user_id)
    return render(request, "users/profile.html", {"user": user})

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


@login_required
def custom_redirect(request):
    return redirect(f"/users/profile/{request.user.id}/")