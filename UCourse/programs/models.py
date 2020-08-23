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
    field = models.ForeignKey(
        Field, related_name='field_programs', on_delete=models.SET_NULL, null=True)
    short_description = models.CharField(max_length=255)
    full_description = RichTextField(blank=True, null=True)
    benefits = RichTextField(blank=True, null=True)
    pre_requisites = RichTextField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='program_tags', blank=True)
    views = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='program_views', through='UserViewProgram', blank=True)
    user_buy = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserBuyProgram', related_name='buy_programs')
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