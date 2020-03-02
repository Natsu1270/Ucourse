from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)
    created_date = models.DateField(auto_now_add=True)
    modified_date = models.DateField(auto_now=True)
