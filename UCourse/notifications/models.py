from django.db import models
from django.utils import timezone

from users.models import User


class Notification(models.Model):

    REGISTER_COURSE = '1'
    REGISTER_PROGRAM = '2'
    REGISTER_CLASS = '3'
    FORUM = '4'

    TYPE_CHOICES = [
        (REGISTER_COURSE, 'Register Course'), (REGISTER_PROGRAM, 'Register Program'),
        (REGISTER_CLASS, 'Register Class'), (FORUM, 'Forum')
    ]

    type = models.CharField(max_length=10, choices=TYPE_CHOICES, null=True, blank=True)
    reference = models.IntegerField(null=True, blank=True)
    content = models.TextField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, related_name='notifications', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    read_date = models.DateTimeField(null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now)


    class Meta:
        db_table = 'Notification'