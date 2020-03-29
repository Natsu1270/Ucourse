from django.db import models
from django.conf import settings
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


class SearchKeyWord(models.Model):
    name = models.CharField(max_length=255)
    count = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

