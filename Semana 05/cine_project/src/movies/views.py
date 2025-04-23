# peliculas/views.py

from django.shortcuts import render, get_object_or_404, redirect
from .models import Muvie

def lista_peliculas(request):
    peliculas = Pelicula.objects.all()
    return render(request, 'peliculas/lista.html', {'peliculas': peliculas})
