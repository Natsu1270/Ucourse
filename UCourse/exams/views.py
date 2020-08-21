from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from django.db.models import Q
from .models import AbilityTest, UserAbilityTest, Exam, StudentExam, StudentExamResult
from . import serializers
from api.utils import uc_response


class ExamDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ExamSerializer
    queryset = Exam.objects.all()


class CreateExamAPI(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ExamSerializer
    queryset = Exam.objects.all()


class StudentExamListAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.StudentExamSerializer
    queryset = StudentExam.objects.all()


class StudentExamPrivateListAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.StudentExamShowSerializer

    def get_queryset(self):
        exam = self.request.query_params['exam_id']
        queryset = StudentExam.objects.filter(
            Q(student=self.request.user) & Q(exam_id=exam)).order_by('-id')
        return queryset


class StudentExamDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.StudentExamSerializer
    queryset = StudentExam.objects.all()


class SubmitExamAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.StudentExamSubmitSerializer
    queryset = StudentExam.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        course_home_id = self.request.data['courseHomeId']
        student = request.user
        responses = request.data['responses']
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        exam = data['exam']
        student_exam = serializer.save(
            student=student, exam=exam, result=data['result'], responses=responses
        )

        student_exam_result = StudentExamResult.objects.filter(
            Q(student_id=student.id) & Q(exam_id=exam.id)
        )
        if len(student_exam_result) == 0:
            StudentExamResult.objects.create(
                student_id=student.id, exam_id=exam.id, final_result=data['result'], course_home_id=course_home_id)
        else:
            instance = student_exam_result[0]
            get_result_type = exam.get_result_type
            past_student_exams = StudentExam.objects.filter(
                Q(student_id=student.id) & Q(exam_id=exam.id)
            )
            if len(past_student_exams) == 0 or get_result_type == 'last':
                instance.final_result = data['result']
            else:
                result_list = [exam.result for exam in past_student_exams]
                if get_result_type == 'best':
                    instance.final_result = max(result_list)
                else:
                    instance.final_result = sum(result_list) / len(result_list)
            instance.save()

        return Response({
            "data": {
                "studentExam": self.get_serializer(student_exam).data,
            },
            "result": True,
            "message": "Submit exam successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class AbilityTestListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.AbilityTestSerializer
    queryset = AbilityTest.objects.all()


class AbilityTestDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.AbilityTestSerializer
    queryset = AbilityTest.objects.all()


class UserAbilityTestListAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestMinSerializer
    queryset = UserAbilityTest.objects.all().order_by('-date_taken')


class UserAbilityTestPrivateListAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestMinSerializer

    def get_queryset(self):
        queryset = UserAbilityTest.objects.filter(
            Q(user=self.request.user) & Q(result__isnull=False)).order_by('-id')
        return queryset


class UserAbilityTestDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestSerializer
    queryset = UserAbilityTest.objects.all()


class GenerateUserAbilityTestAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestSerializer
    queryset = UserAbilityTest.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user = request.user
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        user_ability_test = serializer.save(
            user=user, ability_test=data['ability_test'])
        return Response({
            "data": {
                "user_ability_test": self.get_serializer(user_ability_test).data,
            },
            "result": True,
            "message": "Generated test successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)
