from rest_framework import serializers
from .models import Course, CourseDetail, Skill, UserBuyCourse
from course_homes.models import CourseHome
from profiles.serializers import TeacherProfileSearchSerializer, ProfileSerializer, ProfileMinSerializer


class CourseHomeShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = ProfileMinSerializer(read_only=True)
    full_name = serializers.CharField()

    class Meta:
        model = CourseHome
        fields = [
            'id', 'status', 'name', 'full_name', 'open_date', 'end_date',
            'expected_date', 'register_date',
            'over_admission_days', 'teacher', 'maximum_number'
        ]


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

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'icon', 'slug', 'level',
            'fee_type', 'status', 'course_detail', 'program',
            'field', 'tags', 'ability_test', 'created_date',
            'updated_date', 'created_by', 'c_homes'
        ]
        read_only_fields = ('created_date', 'updated_date', 'created_by')


class CourseSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    teacher = TeacherProfileSearchSerializer(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    course_home_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'fee_type',
            'icon', 'slug', 'level', 'status',
            'teacher', 'field', 'course_home_count'
        ]


class CourseMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'icon', 'status'
        ]


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