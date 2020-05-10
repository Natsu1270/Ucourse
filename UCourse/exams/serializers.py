from rest_framework import serializers

from .models import Exam, StudentExam, QuestionResponse, AbilityTest, UserAbilityTest, UserResponse, Choice
from questions.serializers import QuestionMinSerializer, QuestionSerializer
from courses.serializers import CourseMinSerializer


class ExamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam_type = serializers.CharField(source='get_exam_type_display')
    questions = QuestionSerializer(many=True, read_only=True)
    students = serializers.StringRelatedField(many=True, read_only=True)
    topic = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'code', 'name',
            'exam_type', 'questions', 'students',
            'topic', 'duration', 'pass_score',
            'status'
        ]


class ExamShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exam_type = serializers.CharField(source='get_exam_type_display')

    class Meta:
        model = Exam
        fields = [
            'id', 'code', 'name',
            'exam_type', 'duration', 'pass_score',
            'status'
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
            'id', 'name', 'code', 'duration',
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
