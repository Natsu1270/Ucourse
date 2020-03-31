from rest_framework import serializers
from .models import Program, Field
from courses.serializers import CourseSerializer


class FieldSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    programs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    tags = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Field
        fields = [
            'id', 'name', 'code', 'programs', 'courses', 'field', 'tags', 'created_date'
        ]
        read_only_fields = ('created_date',)


class ProgramSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    program_course = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon', 'program_course',
            'status', 'field', 'created_date',
            'short_description', 'full_description', 'created_date', 'created_by',
            'created_by_name', 'modified_date'
        ]
        read_only_fields = ('created_date', 'modified_date', 'created_by', 'created_by_name')


class ProgramSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    courses_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon',
            'courses_count', 'status', 'field'
        ]


