from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth import validators
from django.utils.translation import gettext as _
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None,  **extra_fields):
        if not email:
            raise ValueError('Email address must be provided')
        user = self.model(email=self.normalize_email(email),
                          username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username_validator = validators.UnicodeUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
        blank=True,
        null=True
    )
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()
    USERNAME_FIELD = 'email'
