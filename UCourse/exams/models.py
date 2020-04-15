from django.db import models
from django.utils import timezone
from django.conf import settings

from lessons.models import Lesson
from courses.models import Course
from questions.models import Question, Choice, QuestionKit

import random


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
    created_by = models.ForeignKey(
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
    duration = models.IntegerField()
    status = models.BooleanField(default=True)
    num_questions = models.IntegerField(default=10, blank=True, null=True)
    course = models.OneToOneField(Course, related_name='ability_test', on_delete=models.CASCADE, blank=True, null=True)
    taken_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, through='UserAbilityTest', related_name='ability_tests')
    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='ability_creator'
    )

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


class UserAbilityTestManager(models.Manager):

    def gen_test(self, ability_test, user, **extra_fields):
        question_kits, questions, test_questions = list(), list(), list()
        skills = ability_test.course.course_detail.skills.all()

        for skill in skills:
            question_kit_query = QuestionKit.objects.filter(skill=skill)
            question_kits += question_kit_query

        for question_kit in question_kits:
            questions += list(question_kit.kit_questions.all())

        e_questions = list(filter(lambda q: q.difficult_level == 'e', questions))
        m_questions = list(filter(lambda q: q.difficult_level == 'm', questions))
        h_questions = list(filter(lambda q: q.difficult_level == 'h', questions))

        test_questions += random.sample(e_questions, k=3)
        test_questions += random.sample(m_questions, k=4)
        test_questions += random.sample(h_questions, k=3)

        instance = self.create(user=user, ability_test=ability_test, **extra_fields)
        instance.questions.set(test_questions)
        instance.save()
        return instance


class UserAbilityTest(models.Model):
    ability_test = models.ForeignKey(
        AbilityTest, related_name='ability_user_test', on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user_ability_test', on_delete=models.SET_NULL, null=True)
    date_taken = models.DateTimeField(default=timezone.now)
    questions = models.ManyToManyField(Question, related_name='ability_questions')
    result = models.IntegerField(null=True, blank=True)
    user_responses = models.ManyToManyField(Choice, related_name='responses_users')

    objects = UserAbilityTestManager()

    def __str__(self):
        return '{0} - {1}'.format(self.ability_test.name, self.user)

    @property
    def duration(self):
        return self.ability_test.duration

    @property
    def course(self):
        return self.ability_test.course


class UserResponse(models.Model):
    choice = models.ForeignKey(Choice, related_name='user_res', on_delete=models.CASCADE)
    user_ability_test = models.ForeignKey(
        UserAbilityTest, related_name='user_r', on_delete=models.CASCADE)

