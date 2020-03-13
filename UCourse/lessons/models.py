from django.db import models
from django.utils import timezone
from course_homes.models import Timeline
from django.conf import settings


class Lesson(models.Model):
    ACTIVE = "active"
    PASSED = "passed"
    PENDING = "pending"

    LESSON_STATUS_CHOICES = [
        (ACTIVE, "Active"),
        (PASSED, "Passed"),
        (PENDING, "Going to start"),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True, db_index=True)
    info = models.TextField(blank=True, null=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=LESSON_STATUS_CHOICES, default=PENDING
    )
    created_date = models.DateField(default=timezone.now)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    created_by_name = models.CharField(max_length=255, null=True, blank=True)
    modified_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email

