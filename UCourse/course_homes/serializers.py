from rest_framework import serializers

from courses.serializers import CourseMinSerializer
from programs.serializers import FieldMinSerializer
from users.models import User
from .models import CourseHome, TopicAsset, LearningTopic, Assignment, StudentAssignment
# from courses.serializers import CourseMinSerializer
from users.serializers import UserSerializer, UserMinSerializer
from exams.serializers import ExamShowSerializer
from forums.serializers import ForumSerializer
from profiles.serializers import ProfileMinSerializer


class RegisterCourseSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()


class TopicAssetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    file = serializers.FileField(required=False)
    views = serializers.StringRelatedField(many=True, required=False)

    class Meta:
        model = TopicAsset
        fields = [
            'id', 'name', 'learning_topic', 'views',
            'file', 'file_type', 'status', 'info'
        ]


class AssignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    assignment_files = TopicAssetSerializer(many=True, required=False)
    students = serializers.StringRelatedField(many=True, required=False)
    views = serializers.StringRelatedField(many=True, required=False)

    class Meta:
        model = Assignment
        fields = [
            'id', 'name', 'start_date', 'due_date', 'assignment_files', 'views',
            'info', 'status', 'learning_topic', 'max_submit_time', 'max_score', 'percentage',
            'students', 'created_date', 'created_by'
        ]


class AssignmentMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)

    class Meta:
        model = Assignment
        fields = [
            'id', 'name', 'learning_topic', 'max_score', 'percentage'
        ]


class LearningTopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)
    topic_assets = TopicAssetSerializer(many=True, read_only=True, required=False)
    topic_exams = ExamShowSerializer(many=True, read_only=True, required=False)
    topic_assignments = AssignmentSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = LearningTopic
        fields = [
            'id', 'name', 'code', 'info', 'course_home', 'topic_assets', 'topic_assignments',
            'topic_exams', 'status'
        ]


class StudentAssignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    assignment = serializers.PrimaryKeyRelatedField(queryset=Assignment.objects.all(), required=False)
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    student_assignment_files = TopicAssetSerializer(many=True, required=False)

    class Meta:
        model = StudentAssignment
        fields = [
            'id', 'assignment', 'student', 'score', 'student_assignment_files',
            'status', 'modified_date', 'assignment', 'submit_time'
        ]


class StudentAssignmentAllGradeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    assignment = AssignmentMinSerializer(required=False)
    student = UserMinSerializer(read_only=True)

    class Meta:
        model = StudentAssignment
        fields = [
            'id', 'assignment', 'student', 'score', 'status', 'assignment', 'modified_date'
        ]

class StudentAssignmentDetailGradeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    assignment = AssignmentMinSerializer(required=False)
    student = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = StudentAssignment
        fields = [
            'id', 'assignment', 'student', 'score', 'status', 'assignment', 'modified_date'
        ]


class StudentAssignmentDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    assignment = serializers.PrimaryKeyRelatedField(queryset=Assignment.objects.all(), required=False)
    student = UserSerializer(required=False)
    student_assignment_files = TopicAssetSerializer(many=True, required=False)

    class Meta:
        model = StudentAssignment
        fields = [
            'id', 'assignment', 'student', 'score', 'student_assignment_files',
            'status', 'modified_date', 'assignment', 'submit_time'
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

