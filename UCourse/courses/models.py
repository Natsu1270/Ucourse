from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext as _
from django.utils.text import slugify
from ckeditor.fields import RichTextField

from programs.models import Program, Field
from tags.models import Tag
from profiles.models import Profile


class Course(models.Model):
    BEGINNER = 'bg'
    INTERMEDIATE = 'im'
    ADVANCED = 'av'
    ALL_LEVEL = 'al'

    COURSE_LEVEL_CHOICES = [
        (BEGINNER, 'Beginner'),
        (INTERMEDIATE, 'Intermediate'),
        (ADVANCED, 'Advanced'),
        (ALL_LEVEL, 'All level'),
    ]

    ACTIVE = 'active'
    INACTIVE = 'inactive'
    COURSE_STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (INACTIVE, 'Inactive'),
    ]

    FREE = 'free'
    PAID = 'paid'

    FEE_TYPE_CHOICES = [
        (FREE, 'Free'),
        (PAID, 'Paid')
    ]

    title = models.CharField(max_length=50)
    icon = models.ImageField(upload_to='courses/icon', blank=True, null=True)
    level = models.CharField(max_length=2, choices=COURSE_LEVEL_CHOICES)
    status = models.CharField(max_length=10, choices=COURSE_STATUS_CHOICES)
    fee_type = models.CharField(max_length=10, choices=FEE_TYPE_CHOICES, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    price = models.CharField(max_length=25, blank=True, null=True)
    discount = models.FloatField(blank=True, null=True)
    outline_detail = RichTextField(blank=True, null=True)
    outline_file = models.FileField(upload_to='courses/outlines', blank=True, null=True)
    user_buy = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserBuyCourse', related_name='buy_courses')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserCourse', related_name='course_user')
    program = models.ManyToManyField(
        Program, related_name='program_course', blank=True)
    field = models.ForeignKey(Field, related_name='field_courses', on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, related_name='course_tags', blank=True)
    views = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='course_viewed', through='UserViewCourse',
                                   blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='user_created_course',
        on_delete=models.SET_NULL,
        null=True,
    )
    created_by_name = models.CharField(max_length=255, blank=True, null=True)


    class Meta:
        db_table = 'Course'

    def __str__(self):
        return self.title

    def get_price(self):
        if self.fee_type == "free" or self.fee_type is None or self.price is None:
            return 0
        return self.price

    def set_created_by(self, user):
        self.created_by = user
        self.created_by_name = user.email

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)

    def check_is_bought(self, student):
        check = UserBuyCourse.objects.filter(user_id=student.id, course_id=self.id, status=True)
        return check.count() > 0

    def check_is_completed(self, student):
        check = UserCourse.objects.filter(user_id=student.id, course_id=self.id, status='completed')
        return check.count() > 0

    @property
    def course_home_count(self):
        return self.c_homes.count()

    @property
    def view_count(self):
        return UserViewCourse.objects.filter(course_id=self.id).count()

    @property
    def course_teachers(self):
        teachers = []
        for c in self.c_homes.all():
            teachers.append(c.teacher)
        return teachers

    @property
    def can_register_class(self):
        course_homes = self.c_homes.all()
        for home in course_homes:
            if home.can_register:
                return True
        return False


class UserViewCourse(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='courses_viewed', on_delete=models.SET_NULL,
                             null=True, blank=True)
    course = models.ForeignKey(Course, related_name='course_user_viewed', on_delete=models.CASCADE)
    view_date = models.DateField(default=timezone.now)

    class Meta:
        db_table = 'UserViewCourse'

    def __str__(self):
        return "{0} - {1}".format(self.user.__str__(), self.course.__str__())


class UserBuyCourse(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    money = models.CharField(max_length=20, null=True, blank=True)
    bought_date = models.DateField(default=timezone.now)
    in_program = models.BooleanField(default=False)
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'course')
        db_table = 'UserBuyCourse'


class UserCourse(models.Model):
    PASS = 'pass'
    FAIL = 'fail'
    ON_GOING = 'on_going'

    STATUS_CHOICES = [
        (PASS, 'Pass course'),
        (FAIL, 'Fail course'),
        (ON_GOING, 'On Going')
    ]
    BAD = 'bad'
    MEDIUM = 'medium'
    GOOD = 'good'
    VERY_GOOD = 'xgood'

    RANK_CHOICES = [
        (MEDIUM, 'Medium'), (GOOD, 'Good'), (VERY_GOOD, 'Very good'), (BAD, 'Bad')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_home = models.ForeignKey('course_homes.CourseHome', on_delete=models.SET_NULL, null=True)
    program = models.ForeignKey('programs.Program', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=ON_GOING, blank=True, null=True)
    active = models.BooleanField(default=True, null=True, blank=True)
    rank = models.CharField(max_length=20, choices=RANK_CHOICES, blank=True, null=True)
    received_certificate = models.BooleanField(default=False)
    is_summarised = models.BooleanField(default=False)
    completed_date = models.DateField(null=True, blank=True)
    started_date = models.DateField(default=timezone.now, blank=True, null=True)
    rate = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'UserCourse'


class Skill(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Skill'


class CourseDetail(models.Model):
    verbose_name = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255, blank=True)
    full_description = RichTextField(blank=True, null=True)
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='course_detail', null=True)
    benefits = RichTextField(
        help_text=_('What you will learn'), blank=True, null=True
    )
    skills = models.ManyToManyField(Skill, related_name='course_skills')
    pre_requisites = RichTextField(blank=True, null=True)

    class Meta:
        db_table = 'CourseDetail'

    def __str__(self):
        return self.course.title
