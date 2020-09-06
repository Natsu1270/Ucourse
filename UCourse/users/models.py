from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.contrib.auth import validators
from django.utils.translation import gettext as _
from django.utils import timezone
from roles.models import Role
from profiles.models import Teacher, Student, Profile


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None, **extra_fields):
        if not email:
            raise ValueError('Email address must be provided')
        user = self.model(
            email=self.normalize_email(email), username=username, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.role = Role.objects.filter(code='AD').first()
        user.save(using=self._db)

        return user

    def create_teacher(self, email, password=None, username=None, **extra_fields):
        user = self.create_user(email, password, username, **extra_fields)
        user.role = Role.objects.filter(code='TC').first()
        user.is_staff = True
        user.save(using=self._db)
        teacher_profile = Teacher.objects.create(user=user)
        teacher_profile.is_teacher = True
        teacher_profile.save(using=self._db)

        return user

    def create_student(self, email, password=None, username=None, **extra_fields):
        user = self.create_user(
            email=email, password=password, username=username)
        user.role = Role.objects.filter(code='SD').first()
        if extra_fields.get('social_uid'):
            user.social_uid = extra_fields.get('social_uid')
            user.is_social_account = True
        user.save(using=self._db)
        student_profile = Student.objects.create(user=user)
        student_profile.is_student = True
        student_profile.save(using=self._db)
        return user

    class Meta:
        db_table = 'UserManager'


class User(AbstractBaseUser, PermissionsMixin):
    username_validator = validators.UnicodeUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
        ),
        validators=[username_validator],
        error_messages={'unique': _(
            'A user with that username already exists.'), },
        blank=True,
        null=True,
    )
    email = models.EmailField(max_length=255, unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    social_uid = models.CharField(max_length=255, unique=True, db_index=True, null=True, blank=True)
    is_social_account = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()
    USERNAME_FIELD = 'email'

    class Meta:
        db_table = 'User'

    def __str__(self):
        return self.email

    @property
    def is_student(self):
        return self.role.code == 'SD'

