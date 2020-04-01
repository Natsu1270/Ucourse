from rest_framework import serializers
from .models import Course, CourseDetail
from profiles.serializers import TeacherProfileSearchSerializer, ProfileSerializer


class CourseDetailSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = CourseDetail
        fields = [
            'verbose_name', 'course', 'short_description',
            'full_description', 'benefits', 'open_date'
        ]


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_detail = CourseDetailSerializer(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    teacher = ProfileSerializer(many=True, read_only=True)
    tags = serializers.StringRelatedField(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'icon',
            'level', 'status', 'course_detail', 'program',
            'teacher', 'field', 'tags', 'created_date', 'updated_date',
            'created_by'
        ]
        read_only_fields = ('created_date','updated_date', 'created_by')


class CourseSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    teacher = TeacherProfileSearchSerializer(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'icon',
            'level', 'status', 'teacher', 'field'
        ]