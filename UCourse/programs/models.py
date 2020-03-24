from django.db import models
from django.conf import settings
from django.utils import timezone


class Field(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Program(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    status = models.BooleanField(default=True)
    field = models.ForeignKey(Field, on_delete=models.SET_NULL, null=True)
    short_description = models.CharField(max_length=255)
    full_description = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    created_by_name = models.CharField(max_length=255, blank=True, null=True)
    modified_date = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email
