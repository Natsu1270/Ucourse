from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from courses.models import Course
from profiles.models import Profile


class CourseHome(models.Model):
    OPEN = 'open'
    CLOSED = 'closed'
    FULL = 'full'
    # cannot register anymore
    IN_PROGRESS = 'in progress'
    COURSE_STATUS_CHOICES = [
        (OPEN, 'Active'),
        (CLOSED, 'Closed'),
        (FULL, 'Full'),
    ]
    name = models.CharField(max_length=255, null=True, blank=True)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='c_homes')
    open_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    register_date = models.DateField(blank=True, null=True)
    expected_date = models.DateField(blank=True, null=True)
    # maximum days after open date
    over_admission_days = models.IntegerField(blank=True, null=True)
    teacher = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='teacher_course',
        limit_choices_to={'is_teacher': True},
        blank=True,
        null=True
    )
    slug = models.SlugField(null=True, blank=True, unique=True)
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='course_homes', blank=True)
    maximum_number = models.IntegerField(null=True, blank=True)
    status = models.CharField(
        max_length=10, choices=COURSE_STATUS_CHOICES, default=OPEN)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)
    course_info = RichTextField(blank=True, null=True)

    def __str__(self):
        return '{0} - {1}'.format(self.course.title, self.name)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.course.title + self.name)
        super(CourseHome, self).save(*args, **kwargs)

    @property
    def full_name(self):
        return self.__str__()


class LearningTopic(models.Model):

    ACTIVE = 'active'
    INACTIVE = 'inactive'
    CLOSED = 'closed'

    TOPIC_STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (INACTIVE, 'Inactive'),
        (CLOSED, 'Closed'),
    ]

    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    info = RichTextField(blank=True, null=True)
    course_home = models.ForeignKey(
        CourseHome, related_name='learning_topics', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=TOPIC_STATUS_CHOICES, default=ACTIVE)
    created_date = models.DateField(default=timezone.now)
    modified_date = models.DateField(auto_now=True)

    def __str__(self):
        return '{0} - {1}'.format(self.course_home.course.title, self.name)

    @property
    def course_slug(self):
        return self.course_home.course.slug

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(LearningTopic, self).save(*args, **kwargs)


def asset_upload_path(instance, filename):
    return '{0}/{1}'.format(instance.upload_path, filename)


class TopicAsset(models.Model):
    VIDEO = 'video'
    DOCUMENT = 'doc'
    UNKNOWN = 'unknown'

    MEDIA_CHOICES = [
        (VIDEO, 'Video'),
        (DOCUMENT, 'Document'),
        (UNKNOWN, 'Unknown'),
    ]

    name = models.CharField(max_length=255)
    learning_topic = models.ForeignKey(
        LearningTopic, related_name='topic_assets', on_delete=models.CASCADE, blank=True, null=True
    )
    assignment = models.ForeignKey(
        'Assignment', related_name='assigment_files', on_delete=models.CASCADE, blank=True, null=True
    )
    student_assignment = models.ForeignKey(
        'StudentAssignment', related_name='student_assigment_files', on_delete=models.CASCADE, blank=True, null=True
    )
    file = models.FileField(upload_to=asset_upload_path)
    file_type = models.CharField(
        max_length=10, choices=MEDIA_CHOICES, blank=True, null=True)
    status = models.BooleanField(default=True)
    info = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return '{0} - {1}'.format(self.name, self.file_type)

    @property
    def upload_path(self):
        return 'courses/home/' + self.learning_topic.course_slug


class Assignment(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateTimeField(null=True, blank=True, default=timezone.now)
    due_date = models.DateTimeField(null=True, blank=True)
    info = RichTextField(blank=True, null=True)
    status = models.BooleanField(default=True)
    max_submit_time = models.IntegerField(blank=True, null=True)
    max_score = models.FloatField(blank=True, null=True)
    learning_topic = models.ForeignKey(
        LearningTopic, related_name='learning_topic_assignments', on_delete=models.CASCADE
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='user_assignment', through='StudentAssignment'
    )
    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


def assignment_upload_path(instance, filename):
    return '{0}/{1}'.format(instance.upload_ass_path, filename)


class StudentAssignment(models.Model):
    EMPTY = '0'
    INVALID = '3'
    SUBMITTED = '1'

    STATUS_CHOICES = [
        (EMPTY, 'Empty'),
        (INVALID, 'Invalid'),
        (SUBMITTED, 'Submitted'),
    ]
    assignment = models.ForeignKey(
        Assignment, related_name='student_ass', on_delete=models.CASCADE)
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='ass_student', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=EMPTY)
    score = models.FloatField(blank=True, null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True, blank=True)

    @property
    def upload_ass_path(self):
        return 'courses/home/' + self.assignment.learning_topic.course_slug + self.assignment.learning_topic.slug
