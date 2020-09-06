from rest_framework import serializers

from course_homes.models import LearningTopic, CourseHome
from users.models import User
from users.serializers import UserMinSerializer
from .models import Exam, StudentExam, QuestionResponse, AbilityTest, UserAbilityTest, UserResponse, Choice, \
    StudentExamResult
from questions.serializers import QuestionSerializer
from courses.serializers import CourseMinSerializer


class ExamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    questions = QuestionSerializer(many=True, required=False)
    students = serializers.StringRelatedField(many=True, read_only=True, required=False)
    topic = serializers.PrimaryKeyRelatedField(queryset=LearningTopic.objects.all(), required=False)
    total_score = serializers.SerializerMethodField(read_only=True)
    views = serializers.StringRelatedField(many=True, required=False)
    max_score = serializers.FloatField(read_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'name', 'get_result_type', 'views',
            'exam_type', 'questions', 'students', 'enable_review',
            'topic', 'duration', 'pass_score', 'max_try', 'max_score',
            'status', 'expired_date', 'start_date', 'total_score', 'percentage'
        ]

    @staticmethod
    def get_total_score(obj):
        questions = obj.questions.all()
        res = 0
        for q in questions:
            res += q.score
        return res


class ExamShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam_type = serializers.CharField(source='get_exam_type_display')
    views = serializers.StringRelatedField(many=True, required=False)
    max_score = serializers.FloatField(read_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'name', 'get_result_type', 'max_try', 'expired_date', 'start_date',
            'exam_type', 'duration', 'pass_score', 'views', 'enable_review', 'max_score',
            'status', 'percentage'
        ]


class ExamMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam_type = serializers.CharField(source='get_exam_type_display')
    max_score = serializers.FloatField(read_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'name', 'get_result_type', 'exam_type', 'duration', 'pass_score', 'max_score', 'percentage'
        ]


class StudentExamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all()
    )
    student = serializers.StringRelatedField(read_only=True)
    duration = serializers.IntegerField(read_only=True)
    topic = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = StudentExam
        fields = [
            'id', 'exam', 'student',
            'date_taken', 'result', 'duration',
            'topic'
        ]


class StudentExamDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam = ExamMinSerializer(read_only=True)

    class Meta:
        model = StudentExam
        fields = [
            'id', 'exam', 'student', 'date_taken', 'result', 'duration',
        ]


class StudentExamResultSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    student = UserMinSerializer(required=False)
    exam = ExamMinSerializer(required=False)
    course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)

    class Meta:
        model = StudentExamResult
        fields = ['id', 'student', 'exam', 'final_result', 'last_update', 'course_home']


class QuestionResponseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    question = serializers.PrimaryKeyRelatedField(read_only=True)
    choices = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    student_exam = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        model = QuestionResponse
        fields = [
            'id', 'question', 'choices', 'student_exam'
        ]


class StudentExamSubmitSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all()
    )
    student = serializers.StringRelatedField(read_only=True)
    responses = QuestionResponseSerializer(many=True, read_only=True)

    class Meta:
        model = StudentExam
        fields = [
            'id', 'exam', 'student', 'result', 'responses'
        ]

    def create(self, validated_data):
        exam = validated_data['exam']
        student = validated_data['student']
        result = validated_data['result']
        responses = validated_data['responses']

        student_exam = StudentExam.objects.create(
            exam=exam, student=student, result=result
        )
        for response in responses:
            question_response = QuestionResponse.objects.create(
                student_exam=student_exam,
                question_id=response['question']
            )
            choices = response['choices']
            for choice in choices:
                choice = Choice.objects.get(pk=choice)
                question_response.choices.add(choice)
            question_response.save()
        return student_exam


class StudentExamShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = StudentExam
        fields = [
            'id', 'exam', 'date_taken', 'result',
        ]


class AbilityTestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(read_only=True)
    taken_users = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = AbilityTest
        fields = [
            'id', 'name','duration',
            'status', 'num_questions', 'course',
            'taken_users', 'created_date'
        ]


class UserResponseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    choice = serializers.PrimaryKeyRelatedField(read_only=True)
    user_ability_test = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserResponse
        fields = [
            'id', 'choice', 'user_ability_test'
        ]


class UserAbilityTestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    ability_test = serializers.PrimaryKeyRelatedField(
        queryset=AbilityTest.objects.all())
    questions = QuestionSerializer(many=True, read_only=True)
    user_responses = serializers.PrimaryKeyRelatedField(
        many=True, required=False, queryset=Choice.objects.all()
    )
    duration = serializers.IntegerField(required=False)
    course = CourseMinSerializer(required=False)

    class Meta:
        model = UserAbilityTest
        fields = [
            'id', 'user', 'ability_test', 'course',
            'date_taken', 'questions', 'result',
            'user_responses', 'duration'
        ]

    def create(self, validated_data):
        ability_test = validated_data['ability_test']
        user = validated_data['user']
        user_ability_test = UserAbilityTest.objects.gen_test(
            user=user, ability_test=ability_test)
        return user_ability_test


class UserAbilityTestMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    ability_test = serializers.StringRelatedField()
    questions = serializers.StringRelatedField(many=True, read_only=True)
    user_responses = UserResponseSerializer(many=True, required=False)
    course = CourseMinSerializer(read_only=True)

    class Meta:
        model = UserAbilityTest
        fields = [
            'id', 'user', 'ability_test', 'course',
            'date_taken', 'questions', 'result',
            'user_responses',
        ]
