import os.path

from django.conf import settings
from django.db import models


def report_upload_to(instance, filename):
    # Change from id to (email?) and if email is changed, change the folder name too ?
    return os.path.join('reports', f'{instance.user.id}', f'{instance.name}.html')


class Report(models.Model):
    name = models.CharField(max_length=255)
    report_body = models.FileField(
        upload_to=report_upload_to,
        blank=True
    )

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'user'],
                name='name_user_unique'
            )
        ]

    def __str__(self):
        str_name_len = 20
        # +3 cuz of triple dots
        str_name = (self.name[:str_name_len])+'...' if len(self.name) > str_name_len+3 else self.name
        return f'{self.user.email}: {str_name}'
