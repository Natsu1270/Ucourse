from django.db import models
from ckeditor.fields import RichTextField
from django.utils import timezone
from django.conf import settings

from course_homes.models import CourseHome


class Forum(models.Model):
    name = models.CharField(max_length=255)
    info = RichTextField(blank=True, null=True)
    course_home = models.ForeignKey(CourseHome, related_name='forums', on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    created_date = models.DateField(default=timezone.now)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


class Thread(models.Model):
    name = models.CharField(max_length=255)
    forum = models.ForeignKey(Forum, related_name='threads', on_delete=models.CASCADE)
    info = RichTextField(blank=True, null=True)
    status = models.BooleanField(default=True)
    view = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user


class ThreadResponse(models.Model):
    content = RichTextField()
    thread = models.ForeignKey(Thread, related_name='thread_replies', on_delete=models.CASCADE)
    parent = models.ForeignKey(
        'self',
        related_name='replies',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='thread_responses', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.content

    def set_created_by(self, user):
        self.created_by = user

    def children(self):
        return ThreadResponse.objects.filter(parent=self)

    @property
    def is_parent(self):
        return True if self.parent is None else False

