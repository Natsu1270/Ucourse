from django.db import models


class Role(models.Model):
    ADMIN = 'AD'
    TEACHER = 'TC'
    STUDENT = 'SD'
    ASSISTANT = 'AS'
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TEACHER, 'Teacher'),
        (STUDENT, 'Student'),
        (ASSISTANT, 'Teacher Assistant')
    ]
    name = models.CharField(max_length=20, unique=True)
    code = models.CharField(max_length=2, choices=ROLE_CHOICES, unique=True)
    status = models.BooleanField(default=True)
    description = models.CharField(max_length=255, blank=True)
    created_date = models.DateField(auto_now_add=True)
    modified_date = models.DateField(auto_now=True)
