from django.db import models
from django.utils import timezone
from course_homes.models import Timeline
from exams.models import Exam


class Lesson(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True, db_index=True)
    info = models.TextField(blank=True, null=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    exames = models.ManyToManyField(Exam)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

