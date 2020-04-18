from rest_framework import serializers
from .models import Question, QuestionKit, Choice


class ChoiceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    questions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Choice
        fields = [
            'id', 'content', 'questions',
            'status', 'created_date'
        ]


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    question_kits = serializers.StringRelatedField(many=True, read_only=True)
    choices = ChoiceSerializer(many=True, read_only=True)
    answers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            'id', 'name', 'code', 'content',
            'choices', 'answers', 'question_type',
            'difficult_level', 'score', 'status',
            'question_kits', 'created_date'
        ]


class QuestionMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Question
        fields = [
            'id', 'name', 'code', 'content', 'question_type',
            'difficult_level', 'score', 'status',
        ]


class QuestionKitSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    kit_questions = QuestionMinSerializer(many=True, read_only=True)
    skill = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = QuestionKit
        fields = [
            'id', 'name', 'code', 'skill', 'status',
            'created_date'
        ]
