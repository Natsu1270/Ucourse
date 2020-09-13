from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q

from rest_framework import views, status, generics, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.utils import uc_response
from certificates.models import StudentCertificate
from certificates.serializers import StudentCertificateSerializer
from course_homes.models import CourseHome
from course_homes.serializers import CourseHomeMinSerializer
from courses.models import Course, UserBuyCourse
from my.serializers import UserBuyCourseSerializer, UserBuyProgramSerializer
from programs.models import Program, StudentProgram, UserBuyProgram
from courses.serializers import CourseSearchSerializer, CourseMySerializer
from programs.serializers import ProgramSearchSerializer, ProgramMinSerializer, StudentProgramSerializer, \
    ProgramProcessSerializer
from users.models import User


class GetAllAPI(generics.GenericAPIView):

    pagination_class = PageNumberPagination

    def get(self, request, *args, **kwargs):

        # courses = Course.objects.all().order_by('-created_date')[:12]
        courses = Course.objects.all().order_by('created_date')
        programs = Program.objects.all().order_by('-created_date')
        paginator = Paginator(courses, 8)
        page = self.request.query_params.get('page')
        try:
            courses = paginator.page(page)
        except PageNotAnInteger:
            courses = paginator.page(1)
        except EmptyPage:
            courses = paginator.page(paginator.num_pages)

        data = {
            "courses": CourseSearchSerializer(instance=courses, many=True).data,
            "programs": ProgramSearchSerializer(instance=programs, many=True).data,
            "maxSize": paginator.num_pages * 8
        }

        return Response(
            uc_response(data=data, result=True, error=None, message='OK', status_code=200),
            status=status.HTTP_200_OK)


class GetAllMyAPI(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        my_courses = CourseHome.objects.filter(students__in=[self.request.user])
        my_programs = Program.objects.filter(user_buy__in=[self.request.user])
        data = {
            "myCourses": CourseHomeMinSerializer(instance=my_courses, context=self.get_serializer_context(), many=True).data,
            "myPrograms": ProgramSearchSerializer(instance=my_programs, context=self.get_serializer_context(), many=True).data
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


class GetTransactionHistory(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        courses = UserBuyCourse.objects.filter(user=self.request.user).order_by('-bought_date')
        programs = UserBuyProgram.objects.filter(user=self.request.user).order_by('-bought_date')

        return Response({
            "courses": UserBuyCourseSerializer(instance=courses, many=True).data,
            "programs": UserBuyProgramSerializer(instance=programs, many=True).data
        }, status=status.HTTP_200_OK)


class GetProgramProcess(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        student = self.request.user
        programs = Program.objects.filter(user_buy=student)
        student_certificate = StudentCertificate.objects.filter(student_id=student.id)

        return Response({
            "programs": ProgramProcessSerializer(
                instance=programs, context=self.get_serializer_context(), many=True
            ).data,
            "studentCertificates": StudentCertificateSerializer(
                instance=student_certificate, context=self.get_serializer_context(), many=True).data,
            "result": True
        }, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}


class GetMyCourses(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        my_courses = Course.objects.filter(user_buy=user)

        return Response(
            data=CourseMySerializer(instance=my_courses,context=self.get_serializer_context(), many=True).data,
            status=status.HTTP_200_OK
        )


class SearchRegisterCourses(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        keyword = self.request.query_params.get("keyword", "")
        courses = Course.objects.filter(Q(title__icontains=keyword) | Q(code__icontains=keyword))
        return Response(
            data=CourseMySerializer(instance=courses, context=self.get_serializer_context(), many=True).data,
            status=status.HTTP_200_OK
        )


class GetTotalMaterialCount(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        course_count = Course.objects.filter(status='active').count()
        program_count = Program.objects.filter(status=True).count()
        teacher_count = User.objects.filter(role__code='TC').count()

        return Response({
            "courseCount": course_count,
            "programCount": program_count,
            "teacherCount": teacher_count
        })