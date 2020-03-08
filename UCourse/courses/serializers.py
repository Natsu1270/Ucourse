from rest_framework import serializers
from .models import Course, CourseDetail


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code',
            'level', 'status', 'program',
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