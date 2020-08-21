from django.db.models import Q

from rest_framework import views, status, generics, permissions
from rest_framework.response import Response

from api.utils import uc_response, create_search_keyword
from course_homes.models import CourseHome, StudentAssignment
from course_homes.serializers import CourseHomeMinSerializer, StudentAssignmentDetailGradeSerializer
from courses.models import Course
from exams.models import StudentExam, StudentExamResult
from exams.serializers import StudentExamDetailSerializer, StudentExamResultSerializer
from programs.models import Program
from courses.serializers import CourseSearchSerializer
from programs.serializers import ProgramSearchSerializer


class SearchAPI(views.APIView):

    def get(self, request):
        query = request.query_params.get('query', None)
        courses = Course.objects.all()
        programs = Program.objects.all()
        query = query.strip()
        create_search_keyword(query)
        if query:
            courses = courses.filter(Q(title__icontains=query))
            programs = programs.filter(name__icontains=query)
        data = {
            "courses": CourseSearchSerializer(instance=courses, many=True).data,
            "programs": ProgramSearchSerializer(instance=programs, many=True).data
        }

        return Response(
            uc_response(data=data, result=True, error=None, message='OK', status_code=200),
            status=status.HTTP_200_OK)


class GetAllAPI(views.APIView):

    @staticmethod
    def get(request):

        courses = Course.objects.all().order_by('-created_date')[:10]
        programs = Program.objects.all().order_by('-created_date')[:10]
        data = {
            "courses": CourseSearchSerializer(instance=courses, many=True).data,
            "programs": ProgramSearchSerializer(instance=programs, many=True).data
        }

        return Response(
            uc_response(data=data, result=True, error=None, message='OK', status_code=200),
            status=status.HTTP_200_OK)


class GetAllMyAPI(views.APIView):

    def get(self, request):
        my_courses = CourseHome.objects.filter(students__in=[self.request.user])
        my_programs = Program.objects.filter(user_buy__in=[self.request.user])
        data = {
            "myCourses": CourseHomeMinSerializer(instance=my_courses, many=True).data,
            "myPrograms": ProgramSearchSerializer(instance=my_programs, many=True).data
        }

        return Response(
            uc_response(data=data, result=True, error=None, message='OK', status_code=200),
            status=status.HTTP_200_OK
        )


class GetStudentGradesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        course_home_id = self.request.query_params['courseHomeId']
        user = self.request.user
        student_exams = StudentExamResult.objects.filter(student_id=user.id, course_home_id=course_home_id)
        student_assignments = StudentAssignment.objects.filter(student_id=user.id)

        return Response({
            "student_exams": StudentExamResultSerializer(instance=student_exams, many=True).data,
            "student_assignments": StudentAssignmentDetailGradeSerializer(instance=student_assignments, many=True).data,
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)
