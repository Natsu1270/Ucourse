from datetime import timedelta, date

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
    exam_percentage = models.IntegerField(default=80, blank=True, null=True)
    open_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    register_date = models.DateField(blank=True, null=True)
    expected_date = models.DateField(blank=True, null=True)
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
        settings.AUTH_USER_MODEL, through='StudentCourseHome', related_name='course_homes', blank=True)
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

    @property
    def can_register(self):
        register_date = self.register_date
        over_date = self.over_admission_days
        last_register_date = register_date + timedelta(days=over_date)
        if last_register_date >= date.today():
            return True
        return False


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
    PDF = 'pdf'
    OTHER = 'other'

    MEDIA_CHOICES = [
        (VIDEO, 'Video'),
        (DOCUMENT, 'Document'),
        (PDF, 'PDF'),
        (OTHER, 'Other'),
    ]

    name = models.CharField(max_length=255)
    learning_topic = models.ForeignKey(
        LearningTopic, related_name='topic_assets', on_delete=models.CASCADE, blank=True, null=True
    )
    assignment = models.ForeignKey(
        'Assignment', related_name='assignment_files', on_delete=models.CASCADE, blank=True, null=True
    )
    student_assignment = models.ForeignKey(
        'StudentAssignment', related_name='student_assignment_files', on_delete=models.CASCADE, blank=True, null=True
    )
    student_notes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='lecture_notes', through='StudentNote')
    file = models.FileField(upload_to=asset_upload_path)
    file_type = models.CharField(
        max_length=10, choices=MEDIA_CHOICES, blank=True, null=True)
    views = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='lecture_viewed', blank=True)
    status = models.BooleanField(default=True)
    info = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return '{0} - {1}'.format(self.name, self.file_type)

    @property
    def upload_path(self):
        if self.learning_topic is not None:
            return 'courses/home/' + self.learning_topic.course_slug
        if self.assignment is not None:
            return 'courses/home/assignment/' + self.assignment.name
        if self.student_assignment is not None:
            return 'courses/home/assignment/submit/' + str(self.student_assignment.id)
        return 'courses/home/assets'


class StudentNote(models.Model):
    topic_asset = models.ForeignKey(TopicAsset, on_delete=models.CASCADE)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=2000, blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content[:10]


class Assignment(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateTimeField(null=True, blank=True, default=timezone.now)
    due_date = models.DateTimeField(null=True, blank=True)
    info = RichTextField(blank=True, null=True)
    status = models.BooleanField(default=True)
    percentage = models.FloatField(null=True, blank=True)
    mandatory = models.BooleanField(default=True, blank=True, null=True)
    max_submit_time = models.IntegerField(blank=True, null=True)
    max_score = models.FloatField(blank=True, null=True)
    learning_topic = models.ForeignKey(
        LearningTopic, related_name='topic_assignments', on_delete=models.CASCADE
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='user_assignment', through='StudentAssignment'
    )
    views = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='assignment_viewed', blank=True
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
    submit_time = models.IntegerField(blank=True, null=True, default=0)
    modified_date = models.DateTimeField(auto_now=True, null=True, blank=True)

    @property
    def upload_ass_path(self):
        return 'courses/home/' + self.assignment.learning_topic.course_slug + self.assignment.learning_topic.slug


class StudentCourseHome(models.Model):
    PASS = 'pass'
    FAIL = 'fail'
    ON_GOING = 'on_going'

    STATUS_CHOICES = [
        (PASS, 'Pass course'),
        (FAIL, 'Fail course'),
        (ON_GOING, 'On Going')
    ]

    MEDIUM = 'medium'
    GOOD = 'good'
    VERY_GOOD = 'xgood'

    RANK_CHOICES = [
        (MEDIUM, 'Medium'), (GOOD, 'Good'), (VERY_GOOD, 'Very good')
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course_home = models.ForeignKey(CourseHome, on_delete=models.SET_NULL, null=True)
    final_score = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, null=True, blank=True)
    rank = models.CharField(max_length=10, choices=RANK_CHOICES, null=True, blank=True)


