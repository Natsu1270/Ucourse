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


class CourseHomeShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = ProfileMinSerializer(read_only=True)
    full_name = serializers.CharField()
    student_count = serializers.SerializerMethodField()
    is_my_class = serializers.SerializerMethodField()

    class Meta:
        model = CourseHome
        fields = [
            'id', 'status', 'name', 'full_name', 'open_date', 'end_date',
            'expected_date', 'register_date',
            'over_admission_days', 'teacher', 'maximum_number', 'student_count', 'is_my_class'
        ]

    @staticmethod
    def get_student_count(obj):
        return obj.students.count()

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        check_user = user.course_homes.filter(pk=obj.id).count() > 0
        return check_user


class CourseHomeMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status',
        ]



