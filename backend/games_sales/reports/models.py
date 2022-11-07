import os.path

from django.conf import settings
from django.db import models
from django.utils.text import slugify


def report_upload_to(instance, filename):
    # Change from id to (email/username(then make it required)?)
    #   and if email/username is changed, change the folder name too ?
    return os.path.join('reports', f'{instance.user.id}', f'{instance.name}.html')


class Report(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
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
                fields=['slug', 'user'],
                name='slug_user_unique'
            )
        ]

    def save(self, force_insert=False, force_update=False,
             using=None, update_fields=None):
        self.slug = slugify(self.name)
        super().save(force_insert=False, force_update=False, using=None, update_fields=None)

    def __str__(self):
        str_name_len = 20
        # +3 cuz of triple dots
        str_name = (self.name[:str_name_len])+'...' if len(self.name) > str_name_len+3 else self.name
        return f'{self.user.email}: {str_name}'
