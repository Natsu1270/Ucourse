from django.db import models
from django.utils import timezone
from courses.models import Course


class CourseHome(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)

    def __str__(self):
        return '{0} - {1}'.format(self.course.title, self.code)


class Timeline(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, unique=True)
    course_home = models.OneToOneField(CourseHome, on_delete=models.CASCADE)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)

    def __str__(self):
        return '{0} - {1}'.format(self.course_home.course.title, self.name)
