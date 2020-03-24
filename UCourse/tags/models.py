from django.db import models
from django.conf import settings
from django.utils import timezone
from courses.models import Course
from programs.models import Program


class Tag(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    created_date = models.DateField(auto_now_add=True)
    modified_date = models.DateField(auto_now=True)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    course = models.ManyToManyField(Course)
    program = models.ManyToManyField(Program)

    def __str__(self):
        return self.name


class SearchKeyWord(models.Model):
    name = models.CharField(max_length=255)
    count = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

