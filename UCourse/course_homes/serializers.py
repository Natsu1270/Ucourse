from rest_framework import serializers

from courses.models import UserCourse
from courses.serializers import CourseMinSerializer
from programs.serializers import FieldMinSerializer
from users.models import User
from .models import CourseHome, TopicAsset, LearningTopic, Assignment, StudentAssignment, StudentNote, StudentCourseHome
# from courses.serializers import CourseMinSerializer
from users.serializers import UserSerializer, UserMinSerializer
from exams.serializers import ExamShowSerializer
from forums.serializers import ForumSerializer
from profiles.serializers import ProfileMinSerializer


class RegisterCourseSerializer(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    course_id = serializers.IntegerField()


class StudentNoteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    topic_asset = serializers.PrimaryKeyRelatedField(queryset=TopicAsset.objects.all(), required=False)
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = StudentNote
        fields = ['id', 'topic_asset', 'student', 'content', 'created_date']


class TopicAssetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    file = serializers.FileField(required=False)
    views = serializers.StringRelatedField(many=True, required=False)
    notes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TopicAsset
        fields = [
            'id', 'name', 'learning_topic', 'views', 'notes',
            'file', 'file_type', 'status', 'info',
        ]

    def get_notes(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            notes = StudentNote.objects.filter(topic_asset_id=obj.id, student_id=user.id).order_by('-created_date')
            return StudentNoteSerializer(instance=notes, many=True).data
        return None


class AssignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    assignment_files = TopicAssetSerializer(many=True, required=False)
    students = serializers.StringRelatedField(many=True, required=False)
    views = serializers.StringRelatedField(many=True, required=False)
    submitted_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Assignment
        fields = [
            'id', 'name', 'start_date', 'due_date', 'assignment_files', 'views', 'mandatory', 'pass_score',
            'info', 'status', 'learning_topic', 'max_submit_time', 'max_score', 'percentage', 'submitted_count',
            'students', 'created_date', 'created_by'
        ]

    @staticmethod
    def get_submitted_count(obj):
        return StudentAssignment.objects.filter(assignment=obj, submit_time__gt=0).count()


class AssignmentMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    learning_topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)

    class Meta:
        model = Assignment
        fields = [
            'id', 'name', 'learning_topic', 'max_score', 'percentage', 'mandatory', 'pass_score'
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
            'id', 'name', 'info', 'course_home', 'topic_assets', 'topic_assignments',
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
            'id', 'assignment', 'student', 'score', 'student_assignment_files', 'is_pass',
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
            'id', 'assignment', 'student', 'score', 'status', 'assignment', 'modified_date', 'is_pass',
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
    course = CourseMinSerializer(read_only=True, required=False)
    students = UserSerializer(many=True, required=False)
    learning_topics = LearningTopicSerializer(many=True, read_only=True)
    slug = serializers.CharField(read_only=True)
    forums = ForumSerializer(many=True, read_only=True, required=False)
    is_my_class = serializers.SerializerMethodField(required=False)
    full_name = serializers.CharField(required=False)
    quiz_num = serializers.SerializerMethodField(read_only=True)
    lecture_num = serializers.SerializerMethodField(read_only=True)
    assignment_num = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'full_name', 'status', 'slug', 'maximum_number', 'quiz_num', 'lecture_num', 'assignment_num',
            'course', 'course_info', 'learning_topics', 'students', 'forums', 'is_my_class',
            'created_date', 'modified_date'
        ]

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        if user:
            check_user = user.course_homes.filter(pk=obj.id).count() > 0
            return check_user
        return False

    @staticmethod
    def get_quiz_num(obj):
        res = 0
        for topic in obj.learning_topics.all():
            res += topic.topic_exams.count()
        return res

    @staticmethod
    def get_lecture_num(obj):
        res = 0
        for topic in obj.learning_topics.all():
            res += topic.topic_assets.count()
        return res

    @staticmethod
    def get_assignment_num(obj):
        res = 0
        for topic in obj.learning_topics.all():
            res += topic.topic_assignments.count()
        return res


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
    status = serializers.SerializerMethodField(read_only=True)
    is_summarised = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'slug', 'full_name', 'teacher', 'status', 'is_summarised'
        ]

    def get_status(self, obj):
        request = self.context.get('request')
        try:
            student_course_home = StudentCourseHome.objects.get(student=request.user, course_home_id=obj.id)
            return student_course_home.status
        except StudentCourseHome.DoesNotExist:
            return None

    def get_is_summarised(self, obj):
        request = self.context.get('request')
        try:
            user_course = UserCourse.objects.get(user=request.user, course_home_id=obj.id)
            return user_course.is_summarised
        except UserCourse.DoesNotExist:
            return None



class StudentCourseHomeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)

    class Meta:
        model = StudentCourseHome
        fields = ['id', 'student', 'course_home', 'final_score', 'status', 'rank']
