from rest_framework import serializers
from .models import Course, CourseDetail, Skill
from profiles.serializers import TeacherProfileSearchSerializer, ProfileSerializer


class CourseDetailSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(read_only=True)
    skills = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = CourseDetail
        fields = [
            'verbose_name', 'course', 'short_description',
            'full_description', 'benefits', 'skills'
        ]


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_detail = CourseDetailSerializer(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    teacher = ProfileSerializer(many=True, read_only=True)
    tags = serializers.StringRelatedField(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    ability_test = serializers.PrimaryKeyRelatedField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'icon', 'slug', 'open_date',
            'end_date', 'level', 'fee_type', 'status', 'course_detail', 'program',
            'teacher', 'field', 'tags', 'ability_test', 'created_date', 'updated_date',
            'created_by', 'course_home'
        ]
        read_only_fields = ('created_date', 'updated_date', 'created_by')


class CourseSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    teacher = TeacherProfileSearchSerializer(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'fee_type',
            'icon', 'slug', 'open_date', 'end_date',
            'level', 'status', 'teacher', 'field'
        ]


class CourseMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'title', 'icon', 'status'
        ]


class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'code']