from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils import timezone
from ckeditor.fields import RichTextField
from tags.models import Tag


class Field(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True)
    slug = models.SlugField(unique=True)
    icon = models.ImageField(upload_to='field/icon', blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Field, self).save(*args, **kwargs)


class Program(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    status = models.BooleanField(default=True)
    icon = models.ImageField(upload_to='programs/icon', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    price = models.CharField(max_length=25, blank=True, null=True)
    discount = models.FloatField(blank=True, null=True)
    discount_percentage = models.FloatField(blank=True, null=True)
    field = models.ForeignKey(
        Field, related_name='field_programs', on_delete=models.SET_NULL, null=True)
    short_description = models.CharField(max_length=255)
    full_description = RichTextField(blank=True, null=True)
    benefits = RichTextField(blank=True, null=True)
    pre_requisites = RichTextField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='program_tags', blank=True)
    views = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='program_views',
        through='UserViewProgram', blank=True
    )
    user_buy = models.ManyToManyField(
        settings.AUTH_USER_MODEL, through='UserBuyProgram', related_name='buy_programs'
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, through='StudentProgram', related_name='student_programs'
    )
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    created_by_name = models.CharField(max_length=255, blank=True, null=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Program, self).save(*args, **kwargs)

    @property
    def courses_count(self):
        return self.program_course.count()


class UserViewProgram(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='programs_viewed', on_delete=models.SET_NULL,
                             null=True)
    program = models.ForeignKey(Program, related_name='program_user_viewed', on_delete=models.CASCADE)
    view_date = models.DateField(default=timezone.now)

    def __str__(self):
        return "{0} - {1}".format(self.user.__str__(), self.program.__str__())


class UserBuyProgram(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    bought_date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'program')


class StudentProgram(models.Model):

    ON_GOING = 'on_going'
    COMPLETED = 'completed'
    ABORTED = 'aborted'

    Program_status_choices = [(ON_GOING, 'On Going'), (COMPLETED, 'Completed'), (ABORTED, 'Aborted')]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Program_status_choices, null=True, blank=True, default=ON_GOING)
    started_date = models.DateField(default=timezone.now, null=True, blank=True)
    completed_date = models.DateField(null=True, blank=True)
    received_certificate = models.BooleanField(default=False, null=True, blank=True)
    file = models.FileField(upload_to='certificates/program/files', null=True, blank=True)

    def __str__(self):
        return "{0}-{1}".format(self.student.__str__(), self.program.__str__())
