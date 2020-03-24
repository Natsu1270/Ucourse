from rest_framework import serializers
from .models import Course, CourseDetail


class CourseSerializer(serializers.ModelSerializer):
    course_detail = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code',
            'level', 'status', 'course_detail', 'program',
            'teacher', 'created_date', 'updated_date',
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
        read_only_fields=['course']