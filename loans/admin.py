from django.contrib import admin

from .models import Loan


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "book",
        "status",
        "loan_date",
    )

    list_filter = (
        "status",
    )