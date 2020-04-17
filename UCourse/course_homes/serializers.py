from rest_framework import serializers

from .models import CourseHome, TopicAsset, LearningTopic, Assignment, StudentAssignment
from courses.serializers import CourseMinSerializer


class CourseHomeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = CourseMinSerializer(read_only=True)
