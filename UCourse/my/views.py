from django.db.models import Q

from rest_framework import views, status, generics, permissions
from rest_framework.response import Response

from api.utils import uc_response
from course_homes.models import CourseHome
from course_homes.serializers import CourseHomeMinSerializer
from courses.models import Course
from programs.models import Program
from courses.serializers import CourseSearchSerializer
from programs.serializers import ProgramSearchSerializer


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
