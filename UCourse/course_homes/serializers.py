from rest_framework import serializers

from .models import CourseHome, TopicAsset, LearningTopic, Assignment, StudentAssignment
# from courses.serializers import CourseMinSerializer
from users.serializers import UserSerializer
from exams.serializers import ExamShowSerializer
from forums.serializers import ForumSerializer
from profiles.serializers import ProfileMinSerializer


class RegisterCourseSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()


class TopicAssetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TopicAsset
        fields = [
            'id', 'name', 'learning_topic',
            'file', 'file_type', 'status',
            'icon', 'info'
        ]


class LearningTopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(read_only=True)
    topic_assets = TopicAssetSerializer(many=True, read_only=True)
    topic_exams = ExamShowSerializer(many=True, read_only=True)

    class Meta:
        model = LearningTopic
        fields = [
            'id', 'name', 'code', 'info', 'course_home', 'topic_assets',
            'topic_exams', 'status'
        ]


class AssignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(read_only=True)
    students = serializers.StringRelatedField(many=True, read_only=True)
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Assignment
        fields = [
            'id', 'name', 'due_date',
            'info', 'status', 'learning_topic',
            'students', 'created_date', 'created_by'
        ]


class StudentAssignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    assigment = serializers.StringRelatedField(read_only=True)
    student = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = StudentAssignment
        fields = [
            'id', 'assignment', 'student',
            'status', 'attachment', 'modified_date'
        ]


class CourseHomeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)
    students = UserSerializer(many=True)
    learning_topics = LearningTopicSerializer(many=True, read_only=True)
    slug = serializers.CharField(read_only=True)
    forums = ForumSerializer(many=True, read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'students', 'slug',
            'learning_topics', 'course_info', 'forums',
            'maximum_number', 'created_date', 'modified_date'
        ]


class CourseHomeMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status',
        ]



