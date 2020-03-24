from rest_framework import serializers
from .models import Program, Field


class FieldSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    programs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Field
        fields = [
            'id', 'name', 'code', 'programs', 'courses', 'created_date'
        ]
        read_only_fields = ('created_date',)


class ProgramSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code',
            'status', 'field', 'created_date',
            'short_description', 'full_description', 'created_date', 'created_by',
            'created_by_name', 'modified_date'
        ]
        read_only_fields = ('created_date','modified_date', 'created_by', 'created_by_name')


