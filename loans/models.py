from django.db import models


class Loan(models.Model):
    STATUS_CHOICES = (
        ('borrowed', 'Borrowed'),
        ('returned', 'Returned'),
    )

    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='loans'
    )

    book = models.ForeignKey(
        'books.Book',
        on_delete=models.CASCADE,
        related_name='loans'
    )

    loan_date = models.DateTimeField(
        auto_now_add=True
    )

    return_date = models.DateTimeField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='borrowed'
    )

    def __str__(self):
        return f"{self.user} - {self.book}"