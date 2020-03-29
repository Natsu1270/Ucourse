from rest_framework import serializers
from .models import Course, CourseDetail
from users.serializers import UserSerializer


class CourseSerializer(serializers.ModelSerializer):
    course_detail = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    teacher = UserSerializer(many=True, read_only=True)
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


class CourseDetailSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False)

    class Meta:
        model = CourseDetail
        fields = [
            'verbose_name', 'course', 'short_description',
            'full_description', 'benefits', 'open_date'
        ]
        read_only_fields = ['course']