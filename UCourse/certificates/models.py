from django.db import models
from django.utils import timezone


class Certificate(models.Model):
    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=10, unique=True)
    certificate_type = models.CharField(max_length=50, blank=True, null=True)
    effective_time = models.IntegerField()

    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
