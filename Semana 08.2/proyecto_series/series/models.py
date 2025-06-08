from django.db import models

class Category(models.Model):
    cod = models.PositiveIntegerField(unique=True)
    nom = models.CharField(max_length=100)

    def _str_(self):
        return self.nom


class Series(models.Model):
    cod = models.PositiveIntegerField(unique=True)
    nom = models.CharField(max_length=200)
    cat = models.ForeignKey(Category, related_name='series', on_delete=models.CASCADE)
    img = models.CharField(max_length=200)

    def _str_(self):
        return self.nom
