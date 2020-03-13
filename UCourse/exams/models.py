from django.db import models
from django.utils import timezone
from django.conf import settings
from django.urls import reverse
from django.utils.translation import gettext as _

from lessons.models import Lesson
from courses.models import Course


class Question(models.Model):

    MULTI_CHOICE = "mc"
    TRUE_FALSE = "tf"
    TEXT = "tx"

    TYPE_CHOICES = [
        (MULTI_CHOICE, _("Multi choices")),
        (TRUE_FALSE, _("True false")),
        (TEXT, _("Paragraph text question")),
    ]

    name = models.CharField(max_length=255, blank=True)
    code = models.CharField(max_length=10, unique=True)
    content = models.TextField()
    level = models.IntegerField(
        verbose_name=_("Level of difficult of the question"), blank=True, null=True
    )
    question_type = models.CharField(
        max_length=2, choices=TYPE_CHOICES, default=MULTI_CHOICE
    )

    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{0} - {1}".format(self.name, self.content[:5])


class Answer(models.Model):
    code = models.CharField(max_length=10, unique=True)
    content = models.TextField()
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    is_right = models.BooleanField(default=False, blank=True, null=True)
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{0} - {1}".format(self.code, self.content[:5])

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
    questions = models.ManyToManyField(Question, related_name="question_exams")
    max_score = models.FloatField(max_length=3)
    pass_score = models.FloatField(max_length=3)

    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True)

    course = models.ForeignKey(
        Course, on_delete=models.SET_NULL, related_name="input_exam", null=True
    )
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='exam_creator'
    )
    created_by_name = models.CharField(max_length=255, blank=True, null=True)
    modified_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='exam_modifier'
    )
    modified_by_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email

    def set_modified_by(self, user):
        self.modified_by = user
        self.modified_by_name = user.email



