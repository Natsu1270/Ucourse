from django.db import models
from UCourse.courses.models import Course
from django.utils.translation import gettext as _


class CourseDetail(models.Model):
    verbose_name = models.CharField(max_length=255)
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    short_description = models.CharField(max_length=255, blank=True)
    full_description = models.TextField(blank=True, null=True)
    benefits = models.TextField(help_text=_(
        'What you will learn'), blank=True, null=True)
