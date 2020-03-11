from django.db import models
from django.utils import timezone
from django.conf import settings


class Exam(models.Model):

    PRE_COURSE_TEST = "pc"
    LESSON_TEST = "lt"
    MIDDLE_COURSE_TEST = "mc"
    FINAL_COURSE_TEST = "fc"

    EXAM_TYPE_CHOICES = [
        (PRE_COURSE_TEST, "PreCourse Test"),
        (LESSON_TEST, "Regular Lesson Test"),
        (MIDDLE_COURSE_TEST, "Middle Course Test"),
        (FINAL_COURSE_TEST, "Final Course Test"),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True, db_index=True)
    exam_type = models.CharField(max_length=2, choices=EXAM_TYPE_CHOICES)
    max_course = models.FloatField(max_length=3)
    pass_course = models.FloatField(max_length=3)

    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )

    def __str__(self):
        return self.name


class Question(models.Model):
    name = models.CharField(max_length=255, blank=True)
    code = models.CharField(max_length=10, unique=True)
    content = models.TextField()

    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{0} - {1}".format(self.name, self.content[:5])


class Answer(models.Model):
    code = models.CharField(max_length=10, unique=True)
    content = models.TextField()
    is_right = models.BooleanField(default=False, blank=True, null=True)
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{0} - {1}".format(self.code, self.content[:5])
