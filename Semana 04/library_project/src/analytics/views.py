# analytics/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import CategoryAnalytics
from library.models import Category, Book   
from django.db.models import Count
from django.utils.timezone import now

def category_analytics_view(request):
    """
    Muestra la analítica de cada categoría.
    Si no existe CategoryAnalytics para una categoría, lo crea.
    Recalcula total_views, total_books, popularity_score.
    """
    for category in Category.objects.all():
        total_books = category.books.count()
        total_views = sum(book.views.count() for book in category.books.all())

        # Popularity score simple: views / books (o 0 si no hay libros)
        popularity_score = total_views / total_books if total_books > 0 else 0

        # Obtener o crear el registro
        analytics, created = CategoryAnalytics.objects.get_or_create(category=category)
        analytics.total_views = total_views
        analytics.total_books = total_books
        analytics.popularity_score = popularity_score
        analytics.save()

    all_analytics = CategoryAnalytics.objects.select_related('category').order_by('-popularity_score')
    return render(request, 'analytics/category_analytics.html', {
        'analytics_list': all_analytics,
        'updated': now()
    })
