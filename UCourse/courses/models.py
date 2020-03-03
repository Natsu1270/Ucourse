from django.db import models
from django.conf import settings
from UCourse.programs.models import Program


class Course(models.Model):

    BEGINNER = 'bg'
    INTERMEDIATE = 'im'
    ADVANCED = 'av'
    ALL_LEVEL = 'al'

    COURSE_LEVEL_CHOICES = [
        (BEGINNER, 'Beginner'),
        (INTERMEDIATE, 'Intermediate'),
        (ADVANCED, 'Advanced'),
        (ALL_LEVEL, 'All level'),
    ]

    title = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    level = models.CharField(max_length=2, choices=COURSE_LEVEL_CHOICES)
    program = models.ManyToManyField(
        Program, related_name='program_course', on_delete=models.SET_NULL)
    teacher = models.ManyToManyField(
        settings.AUTH_MODEL_FIELD, related_name='teacher_course', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='user_created_course',
        on_delete=models.SET_NULL
    )
