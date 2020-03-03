from django.db import models
from django.conf import settings
from UCourse.courses.models import Course
from UCourse.programs.models import Program


class Tag(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    created_date = models.DateField(auto_now_add=True)
    modified_date = models.DateField(auto_now=True)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL)
    course = models.ManyToManyField(Course, on_delete=models.SET_NULL)
    program = models.ManyToManyField(Program, on_delete=models.SET_NULL)
