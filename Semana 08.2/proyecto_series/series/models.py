from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def _str_(self):
        return self.name

class Series(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='series', on_delete=models.CASCADE)

    def _str_(self):
        return self.title
