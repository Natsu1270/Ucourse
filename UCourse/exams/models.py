from django.db import models
from django.utils import timezone
from django.conf import settings
from django.urls import reverse

from lessons.models import Lesson
from courses.models import Course
from questions.models import Question


class Exam(models.Model):
    LESSON_TEST = "lt"
    MIDDLE_COURSE_TEST = "mc"
    FINAL_COURSE_TEST = "fc"

    EXAM_TYPE_CHOICES = [
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


class AbilityTest(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True)
    courses = models.ManyToManyField(Course, related_name='ability_tests')
    time = models.IntegerField()
    status = models.BooleanField(default=True)
    num_questions = models.IntegerField(default=10, blank=True, null=True)

    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='ability_creator'
    )

    def __str__(self):
        return self.name


class UserAbilityTest(models.Model):
    ability_tests = models.ForeignKey(
        AbilityTest, related_name='ability_user_test', on_delete=models.SET_NULL, null=True)
    users = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user_ability_test', on_delete=models.SET_NULL, null=True)
    date_taken = models.DateTimeField(default=timezone.now)
    result = models.IntegerField(null=True, blank=True)
