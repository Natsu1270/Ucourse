from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _
from ckeditor.fields import RichTextField
from django.conf import settings
from courses.models import Skill


class Choice(models.Model):
    content = RichTextField()
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'Choice'

    def __str__(self):
        return self.content[:50]


class Question(models.Model):
    MULTI_CHOICE = "mc"
    TRUE_FALSE = "tf"
    TEXT = "tx"
    CHECK_BOX = "cb"

    TYPE_CHOICES = [
        (MULTI_CHOICE, _("Multi choices")),
        (TRUE_FALSE, _("True false")),
        (TEXT, _("Paragraph text question")),
        (CHECK_BOX, _("Checkbox choices")),
    ]
    EASY = "e"
    MEDIUM = "m"
    HARD = "h"

    LEVEL_CHOICES = [
        (EASY, _("Easy")),
        (MEDIUM, _("Medium")),
        (HARD, _("Hard")),
    ]

    name = models.CharField(max_length=255, blank=True)
    content = RichTextField()
    choices = models.ManyToManyField(Choice, related_name='questions')
    answers = models.ManyToManyField(Choice, related_name='ans_questions')
    question_type = models.CharField(
        max_length=2, choices=TYPE_CHOICES, default=MULTI_CHOICE
    )
    difficult_level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
    score = models.FloatField(default=1.0, blank=True, null=True)
    status = models.BooleanField(default=True)
    question_kits = models.ManyToManyField('QuestionKit', related_name='kit_questions')

    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'Question'

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


class QuestionKit(models.Model):

    name = models.CharField(max_length=255)
    skill = models.ForeignKey(Skill, related_name='skill_question_kits', on_delete=models.SET_NULL, null=True)
    status = models.BooleanField(default=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='kit_creator')
    created_date = models.DateField(auto_now_add=True)
    modified_by = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='kit_modifier')
    modified_date = models.DateField(auto_now=True)

    class Meta:
        db_table = 'QuestionKit'

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


