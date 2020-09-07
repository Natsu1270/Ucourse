from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from django.db.models import Q

from course_homes.models import CourseHome
from notifications.models import Notification
from .models import AbilityTest, UserAbilityTest, Exam, StudentExam, StudentExamResult
from . import serializers
from api.utils import uc_response
from .serializers import StudentExamResultSerializer


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

    def post(self, request, *args, **kwargs):
        course_home_id = self.request.data.get('courseHomeId')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        new_exam = Exam.objects.create(
            name=data['name'], get_result_type=data['get_result_type'], mandatory=data['mandatory'],
            question_num=data['question_num'], topic=data['topic'], percentage=data.get('percentage', None),
            pass_percentage=data.get('pass_percentage', None), duration=data['duration'], max_try=data.get('max_try', None),
            start_date=data.get('start_date', None), expired_date=data.get('expired_date', None),
            exam_type=data['exam_type']

        )

        course_home = CourseHome.objects.get(pk=course_home_id)
        students = course_home.students.all()
        is_mandatory = data.get('mandatory', True)
        for student in students:
            StudentExamResult.objects.create(
                student=student, exam_id=new_exam.id, mandatory=is_mandatory, course_home=course_home
            )
            Notification.objects.create(user_id=student.id, type="6", reference=new_exam.id)

        return Response({"Result": True}, status=status.HTTP_201_CREATED)


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


class GetStudentExamResultDetail(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        student = self.request.user
        exam_id = self.request.query_params.get('examId')

        instance = StudentExamResult.objects.get(student=student, exam_id=exam_id)
        return Response(data=StudentExamResultSerializer(instance=instance).data, status=status.HTTP_200_OK)

class ReviewStudentExam(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.StudentExamReviewSerializer
    queryset = StudentExam.objects.all()


class StudentExamDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.StudentExamSerializer
    queryset = StudentExam.objects.all()


class InitExamAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        student = self.request.user
        course_home_id = self.request.data.get('courseHomeId')
        exam_id = self.request.data.get('examId')
        exam = Exam.objects.get(pk=exam_id)
        max_try = exam.max_try

        past_try_count = StudentExam.objects.filter(student_id=student.id, exam_id=exam_id).count()

        if max_try is not None and past_try_count >= max_try:
            return Response({
                "result": False,
                "message": "Reach limitation of try number"
            }, status=status.HTTP_200_OK)

        student_exam = StudentExam.objects.create(student_id=student.id, exam_id=exam_id, result=0)
        student_exam_result = StudentExamResult.objects.filter(
            Q(student_id=student.id) & Q(exam_id=exam_id)
        )
        if len(student_exam_result) == 0:
            StudentExamResult.objects.create(
                student_id=student.id, exam_id=exam_id, final_result=0, course_home_id=course_home_id)

        return Response({
            "result": True,
            "studentExamId": student_exam.id
        }, status=status.HTTP_200_OK)


class SubmitExamAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.StudentExamSubmitSerializer
    queryset = StudentExam.objects.all()

    @staticmethod
    def calculateResult(responses, questions):
        pass

    def post(self, request, *args, **kwargs):
        course_home_id = self.request.data['courseHomeId']
        student = request.user
        instance = self.get_object()
        serializer = self.get_serializer(instance=instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        data = serializer.validated_data

        exam = data['exam']
        max_score = exam.max_score
        pass_percentage = exam.pass_percentage
        pass_score = max_score * pass_percentage / 100
        result_score = data['result']
        is_pass = result_score >= pass_score

        instance.is_pass = is_pass
        instance.save()

        student_exam_result = StudentExamResult.objects.filter(
            Q(student_id=student.id) & Q(exam_id=exam.id)
        )
        if len(student_exam_result) == 0:
            StudentExamResult.objects.create(
                student_id=student.id, exam_id=exam.id, final_result=data['result'], course_home_id=course_home_id, is_pass=is_pass)
        else:
            exam_instance = student_exam_result[0]
            get_result_type = exam.get_result_type
            past_student_exams = StudentExam.objects.filter(
                Q(student_id=student.id) & Q(exam_id=exam.id)
            )
            if len(past_student_exams) == 0 or get_result_type == 'last':
                exam_instance.final_result = data['result']
            else:
                result_list = [exam.result for exam in past_student_exams]
                if get_result_type == 'best':
                    exam_instance.final_result = max(result_list)
                else:
                    exam_instance.final_result = sum(result_list) / len(result_list)
            is_pass = exam_instance.final_result >= pass_score
            exam_instance.is_pass = is_pass
            exam_instance.save()

        return Response({
            "data": {
                "studentExam": self.get_serializer(instance).data,
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
