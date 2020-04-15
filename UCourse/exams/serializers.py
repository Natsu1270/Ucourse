from rest_framework import serializers

from .models import Exam, AbilityTest, UserAbilityTest, UserResponse, Choice
from questions.serializers import QuestionMinSerializer, QuestionSerializer
from courses.serializers import CourseMinSerializer


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
    course = CourseMinSerializer()

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
