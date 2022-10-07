import os

from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from .models import Report


# transaction.on_commit(lambda: instance.report_body.delete(save=False)) ?
@receiver(post_delete, sender=Report)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.report_body:
        if os.path.isfile(instance.report_body.path):
            instance.report_body.delete(save=False)


@receiver(pre_save, sender=Report)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = Report.objects.get(pk=instance.pk).report_body
    except Report.DoesNotExist:
        return False

    new_file = instance.report_body
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            instance.report_body.delete(save=False)
