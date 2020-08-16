from rest_framework import generics, permissions, status
from rest_framework.response import Response
from questions import serializers
from questions.models import Question, Choice
from exams.models import Exam
from copy import deepcopy


class QuestionDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.QuestionSerializer
    queryset = Question.objects.all()


class QuestionListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.QuestionSerializer
    queryset = Question.objects.all()


class CreateQuestionAPI(generics.GenericAPIView):

    serializer_class = serializers.QuestionMinSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        exam = Exam.objects.get(pk=request.data['exam'])
        choices = request.data['choices']
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        question = serializer.save()
        question.question_exams.add(exam)

        for choice in choices:
            new_choice = Choice.objects.create(content=choice['content'])
            question.choices.add(new_choice)
            if choice['isAnswer'] and choice['isAnswer'] is True:
                question.answers.add(new_choice)

        question.created_by = self.request.user
        question.save()

        return Response({
            "data": serializers.QuestionSerializer(instance=question).data,
            "result": True,
            "message": "Register successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class EditQuestionAPI(generics.GenericAPIView):
    serializer_class = serializers.QuestionMinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        choices = request.data['choices']
        question_id = request.data['id']
        instance = Question.objects.get(pk=question_id)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        question = serializer.save()

        old_choices = instance.choices
        old_answers = instance.answers

        new_choice_ids = list()

        for choice in choices:

            if 'id' in choice and choice['id']:
                new_choice_ids.append(choice['id'])
                old_choice = old_choices.get(pk=choice['id'])
                old_choice.content = choice['content']
                old_choice.save()
                is_answers = old_answers.filter(pk=choice['id'])

                if len(is_answers) == 0 and (choice['isAnswer'] and choice['isAnswer'] is True):
                    question.answers.add(old_choice)

                if len(is_answers) > 0 and (choice['isAnswer'] is None or choice['isAnswer'] is False):
                    question.answers.remove(old_choice)
            else:
                new_choice = Choice.objects.create(content=choice['content'])
                new_choice_ids.append(new_choice.id)
                question.choices.add(new_choice)
                if choice['isAnswer'] and choice['isAnswer'] is True:
                    question.answers.add(new_choice)

        for choice in old_choices.all():
            if choice.id not in new_choice_ids:
                choice.delete()

        question = question.save()

        return Response({
            "data": serializers.QuestionSerializer(instance=question).data,
            "result": True, "message": "Edit question successfully", "status_code": 201
        }, status=status.HTTP_200_OK)
