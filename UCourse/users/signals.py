from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from profiles.models import Teacher


@receiver(post_save, sender=User)
def created_teacher_profile(sender, instance, **kwargs):
    if kwargs['created'] and not instance.role.code == 'SD':
        Teacher.objects.create(user=instance)
