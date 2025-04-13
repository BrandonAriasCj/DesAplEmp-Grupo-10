from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from library.models import Book, Category

class LibraryUser(AbstractUser):
    """Extended user model with additional library-related fields"""
    bio = models.TextField(blank=True)
    favorite_categories = models.ManyToManyField(Category, blank=True, related_name='fans')
    profile_image = models.ImageField(upload_to='user_profiles/', blank=True)

    # Solución: Agregar related_name para evitar conflictos
    groups = models.ManyToManyField(Group, related_name="libraryuser_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="libraryuser_permissions")

class ReadingList(models.Model):
    """Model for user reading lists"""
    user = models.ForeignKey(LibraryUser, on_delete=models.CASCADE, related_name='reading_lists')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    books = models.ManyToManyField(Book, related_name='in_reading_lists')
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} by {self.user.username}"

class BookReview(models.Model):
    """Model for book reviews by users"""
    user = models.ForeignKey(LibraryUser, on_delete=models.CASCADE, related_name='reviews')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'book')
    
    def __str__(self):
        return f"Review of {self.book.title} by {self.user.username}"
