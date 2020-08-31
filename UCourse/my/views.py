from django.db.models import Q

from rest_framework import views, status, generics, permissions
from rest_framework.response import Response

from api.utils import uc_response
from course_homes.models import CourseHome
from course_homes.serializers import CourseHomeMinSerializer
from courses.models import Course
from programs.models import Program, StudentProgram
from courses.serializers import CourseSearchSerializer
from programs.serializers import ProgramSearchSerializer, ProgramMinSerializer, StudentProgramSerializer, \
    ProgramProcessSerializer


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


class GetAllBoughtAndRegister(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        courses = Course.objects.filter(user_buy=self.request.user)
        course_homes = CourseHome.objects.filter(students__in=[self.request.user])
        programs = Program.objects.filter(user_buy=self.request.user)

        return Response({
            "courseHomes": CourseHomeMinSerializer(instance=course_homes, many=True).data,
            "courses": CourseSearchSerializer(instance=courses, context=self.get_serializer_context(), many=True).data,
            "programs": ProgramMinSerializer(instance=programs, context=self.get_serializer_context(), many=True).data,
            "result": True
        }, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}


class GetProgramProcess(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        student = self.request.user
        programs = Program.objects.filter(user_buy=student)

        return Response({
            "programs": ProgramProcessSerializer(
                instance=programs, context=self.get_serializer_context(), many=True
            ).data,
            "result": True
        }, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}