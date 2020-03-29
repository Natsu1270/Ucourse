from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext as _
from programs.models import Program, Field
from tags.models import Tag


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

    ACTIVE = 'active'
    INACTIVE = 'inactive'
    CLOSED = 'closed'
    FULL = 'full'
    COURSE_STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
        (FULL, 'Full'),
        (INACTIVE, 'Inactive'),
    ]

    title = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    icon = models.ImageField(blank=True, null=True)
    level = models.CharField(max_length=2, choices=COURSE_LEVEL_CHOICES)
    status = models.CharField(max_length=10, choices=COURSE_STATUS_CHOICES)
    program = models.ManyToManyField(
        Program, related_name='program_course', blank=True)
    teacher = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='teacher_course',
        blank=True,
        limit_choices_to={'role_id': 2},
    )
    field = models.ForeignKey(Field, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, related_name='course_tags', blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='user_created_course',
        on_delete=models.SET_NULL,
        null=True,
    )
    created_by_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email


class CourseDetail(models.Model):
    verbose_name = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255, blank=True)
    full_description = models.TextField(blank=True, null=True)
    course = models.OneToOneField(Course, on_delete=models.CASCADE, null=True)
    benefits = models.TextField(
        help_text=_('What you will learn'), blank=True, null=True
    )
    open_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.course.title
