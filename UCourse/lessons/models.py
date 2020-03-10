from django.db import models
from django.utils import timezone
from course_homes.models import Timeline


class Lesson(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True, db_index=True)
    info = models.TextField(blank=True, null=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)


class LessonMaterial(models.Model):
    VIDEO = 'video'
    SOUND = 'sound'
    DOCUMENT = 'doc'
    IMAGE = 'img'

    LESSON_MATERIAL_TYPES = [
        (VIDEO, 'video'),
        (SOUND, 'sound'),
        (DOCUMENT, 'doc'),
        (IMAGE, 'img')
    ]

    name = models.CharField(max_length=255)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    info = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=10, choices=LESSON_MATERIAL_TYPES)

