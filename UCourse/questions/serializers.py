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
    question_kits = serializers.StringRelatedField(many=True, read_only=True, required=False)
    choices = ChoiceSerializer(many=True, required=False)
    answers = serializers.PrimaryKeyRelatedField(many=True, required=False, queryset=Choice.objects.all())

    class Meta:
        model = Question
        fields = [
            'id', 'name', 'content',
            'choices', 'answers', 'question_type',
            'difficult_level', 'score', 'status',
            'question_kits', 'created_date'
        ]


class QuestionMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Question
        fields = [
            'id', 'name', 'content', 'question_type',
            'difficult_level', 'score', 'status',
        ]


class QuestionKitSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    kit_questions = QuestionMinSerializer(many=True, read_only=True)
    skill = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = QuestionKit
        fields = [
            'id', 'name',  'skill', 'status',
            'created_date'
        ]
