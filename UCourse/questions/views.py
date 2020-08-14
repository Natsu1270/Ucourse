from rest_framework import generics, permissions, status
from rest_framework.response import Response
from questions import serializers
from questions.models import Question, Choice
from exams.models import Exam


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

        question.created_by(self.request.user)
        question = question.save()

        return Response({
            "data": {
                serializers.QuestionSerializer(instance=question).data
            },
            "result": True,
            "message": "Register successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)
