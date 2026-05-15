from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name