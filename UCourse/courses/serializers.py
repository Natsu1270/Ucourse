from rest_framework import serializers

from users.models import User
from .models import Course, CourseDetail, Skill, UserBuyCourse, UserViewCourse
from course_homes.models import CourseHome
from profiles.serializers import TeacherProfileSearchSerializer, ProfileSerializer, ProfileMinSerializer


class CourseHomeShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = ProfileMinSerializer(read_only=True)
    full_name = serializers.CharField()
    student_count = serializers.SerializerMethodField()
    is_my_class = serializers.SerializerMethodField()

    class Meta:
        model = CourseHome
        fields = [
            'id', 'status', 'name', 'full_name', 'open_date', 'end_date',
            'expected_date', 'register_date',
            'over_admission_days', 'teacher', 'maximum_number', 'student_count', 'is_my_class'
        ]

    @staticmethod
    def get_student_count(obj):
        return obj.students.count()

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        check_user = CourseHome.objects.filter(students__in=[user])
        return True if check_user.count() > 0 else False


class CourseDetailSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(read_only=True)
    skills = serializers.StringRelatedField(many=True, read_only=True)
    course_home_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = CourseDetail
        fields = [
            'verbose_name', 'course', 'short_description', 'course_home_count',
            'full_description', 'benefits', 'skills'
        ]


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_detail = CourseDetailSerializer(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    tags = serializers.StringRelatedField(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    ability_test = serializers.PrimaryKeyRelatedField(read_only=True)
    c_homes = CourseHomeShowSerializer(many=True, read_only=True)
    is_my_course = serializers.SerializerMethodField()
    views = serializers.StringRelatedField(many=True, required=False)
    view_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'icon', 'slug', 'level', 'outline_detail', 'outline_file',
            'fee_type', 'status', 'course_detail', 'program', 'view_count',
            'field', 'tags', 'ability_test', 'views', 'created_date',
            'updated_date', 'created_by', 'c_homes', 'is_my_course', 'price'
        ]
        read_only_fields = ('created_date', 'updated_date', 'created_by')

    def get_is_my_course(self, obj):
        user = self.context.get('user')
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False

    @staticmethod
    def get_view_count(obj):
        return obj.views.count()


class CourseSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    level = serializers.CharField(source='get_level_display')
    course_home_count = serializers.IntegerField(read_only=True)
    course_teachers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    views = serializers.StringRelatedField(many=True, required=False)
    view_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'fee_type', 'views',
            'icon', 'slug', 'level', 'status', 'view_count',
            'field', 'course_home_count', 'course_teachers'
        ]

    @staticmethod
    def get_view_count(obj):
        return UserViewCourse.objects.filter(course_id=obj.id).count()


class CourseMinSerializer(serializers.ModelSerializer):
    is_my_course = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'icon', 'status', 'is_my_course',
        ]

    def get_is_my_course(self, obj):
        user = self.context.get('user')
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False


class UserBuyCourseSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = UserBuyCourse
        fields = [
            'id', 'user', 'course', 'bought_date'
        ]


class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'code']