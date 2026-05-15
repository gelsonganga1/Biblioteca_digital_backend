from django.contrib import admin

from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "author",
        "category",
        "available",
    )

    list_filter = (
        "category",
        "available",
    )

    search_fields = (
        "title",
    )