from django.db import models
from django.conf import settings
from django.utils import timezone

from datetime import date


class Profile(models.Model):

    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'
    NOT_SAY = 'N'
    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
        (NOT_SAY, 'Rather not say')
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='user_profile',
        primary_key=True,
        on_delete=models.CASCADE
    )
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to='profile/avatar', null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    bio = models.TextField(null=True)
    address = models.CharField(max_length=255, blank=True)

    university = models.CharField(max_length=255, blank=True)
    major = models.CharField(max_length=255, blank=True)
    occupation = models.CharField(max_length=50, blank=True)
    public_info = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now, null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.user.email

    @property
    def get_avatar(self):
        if self.avatar:
            return self.avatar
        return settings.DEFAULT_AVATAR_URL

    @property
    def age(self):
        delta_day = date.today() - self.birth_date
        return delta_day.days // 365

    @property
    def fullname(self):
        return self.first_name + ' ' + self.last_name



