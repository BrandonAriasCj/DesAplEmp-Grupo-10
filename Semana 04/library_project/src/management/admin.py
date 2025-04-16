from django.contrib import admin
from .models import LibraryBranch, BookCopy, BookLoan, Reservation

admin.site.register(LibraryBranch)
admin.site.register(BookCopy)
admin.site.register(BookLoan)
admin.site.register(Reservation)
