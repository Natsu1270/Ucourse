from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Course, CourseDetail


@receiver(post_save, sender=Course)
def create_course_detail_on_course_creating(sender, instance, **kwargs):
    if kwargs['created']:
        CourseDetail.objects.create(course=instance, verbose_name=instance.title)


