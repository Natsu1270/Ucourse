from rest_framework import serializers

from courses.serializers import CourseMinSerializer
from programs.serializers import FieldMinSerializer
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
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    file = serializers.FileField(required=False)

    class Meta:
        model = TopicAsset
        fields = [
            'id', 'name', 'learning_topic',
            'file', 'file_type', 'status', 'info'
        ]




class LearningTopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)
    topic_assets = TopicAssetSerializer(many=True, read_only=True, required=False)
    topic_exams = ExamShowSerializer(many=True, read_only=True, required=False)

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
    course = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    students = UserSerializer(many=True, required=False)
    learning_topics = LearningTopicSerializer(many=True, read_only=True)
    slug = serializers.CharField(read_only=True)
    forums = ForumSerializer(many=True, read_only=True, required=False)
    is_my_class = serializers.SerializerMethodField(required=False)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'students', 'slug',
            'learning_topics', 'course_info', 'forums', 'is_my_class',
            'maximum_number', 'created_date', 'modified_date'
        ]

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        if user:
            check_user = user.course_homes.filter(pk=obj.id).count() > 0
            return check_user
        return False


class CourseHomeShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = ProfileMinSerializer(read_only=True)
    full_name = serializers.CharField()
    student_count = serializers.SerializerMethodField()
    is_my_class = serializers.SerializerMethodField()
    field = serializers.SerializerMethodField()
    course = CourseMinSerializer(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'status', 'name', 'full_name', 'open_date', 'end_date',
            'expected_date', 'register_date', 'field', 'course',
            'over_admission_days', 'teacher', 'maximum_number', 'student_count', 'is_my_class'
        ]

    def get_student_count(self, obj):
        return obj.students.count()

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        if user:
            check_user = user.course_homes.filter(pk=obj.id).count() > 0
            return check_user
        return False

    def get_field(self, obj):
        field = obj.course.field
        return FieldMinSerializer(instance=field).data


class CourseHomeMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # course = serializers.PrimaryKeyRelatedField(read_only=True)
    teacher = serializers.StringRelatedField(read_only=True)
    course = CourseMinSerializer(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'slug', 'full_name', 'teacher'
        ]

