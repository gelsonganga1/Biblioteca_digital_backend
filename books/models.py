from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)

    description = models.TextField()

    pdf = models.FileField(
        upload_to='books/pdfs/'
    )

    cover = models.ImageField(
        upload_to='books/covers/'
    )

    available = models.BooleanField(default=True)

    author = models.ForeignKey(
        'authors.Author',
        on_delete=models.CASCADE,
        related_name='books'
    )

    category = models.ForeignKey(
        'categories.Category',
        on_delete=models.CASCADE,
        related_name='books'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title