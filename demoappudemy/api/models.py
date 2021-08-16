from django.db import models
from rest_framework.fields import MISSING_ERROR_MESSAGE


class BookNumber(models.Model):
    isbn_10 = models.CharField(max_length=10, blank=True)
    isbn_13 = models.CharField(max_length=13, blank=True)


class Book(models.Model):
    title = models.CharField(max_length=36, blank=False, unique=True)
    description = models.TextField(max_length=256, blank=True)

    price = models.DecimalField(default=0, max_digits=3, decimal_places=2)

    published = models.DateField(blank=True, null=True, default=None)
    is_published = models.BooleanField(default=False)

    cover = models.ImageField(upload_to='covers/', blank=True)
    number = models.OneToOneField(
        BookNumber, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Character(models.Model):
    name = models.CharField(max_length=30)
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name='characters')


class Author(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    books = models.ManyToManyField(Book, related_name='authors')
