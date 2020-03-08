from django.db import models
from django.conf import settings


class Program(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    updated_date = models.DateTimeField(auto_now=True)
    short_description = models.CharField(max_length=255)
    full_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
