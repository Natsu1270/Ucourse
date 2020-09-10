import datetime
from django.db.models import Count
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from course_homes.models import StudentCourseHome
from course_homes.serializers import StudentCourseHomeSerializer
from courses.models import UserCourse, Course, UserBuyCourse
from courses.serializers import UserCourseSerializer, CourseCertificateSerializer, CourseMinSerializer
from programs.models import StudentProgram, Program
from programs.serializers import StudentProgramSerializer, StudentProgramCertificateSerializer, \
    ProgramCertificateSerializer


class GetListSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_id = self.request.query_params.get('course_id')
        class_id = self.request.query_params.get('class_id')
        course = Course.objects.get(pk=course_id)
        user_courses = UserCourse.objects.filter(course_id=course_id, course_home_id=class_id)
        student_course_homes = StudentCourseHome.objects.filter(course_home_id=class_id)

        return Response({
            "courseDetail": CourseMinSerializer(instance=course).data,
            "userCourses": UserCourseSerializer(instance=user_courses, many=True).data,
            "studentCourseHomes": StudentCourseHomeSerializer(instance=student_course_homes, many=True).data
        }, status=status.HTTP_200_OK)


class GetStudentSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_id = self.request.query_params.get('courseId')
        class_id = self.request.query_params.get('courseHomeId')
        student = self.request.user

        instance = UserCourse.objects.get(course_id=course_id, course_home_id=class_id, user_id=student.id)

        return Response(
            data=UserCourseSerializer(instance=instance).data, status=status.HTTP_200_OK
        )


class UpdateSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        summary_id = self.request.data.get('userCourseId', None)
        stt = self.request.data.get('status', None)
        rank = self.request.data.get('rank', None)

        if summary_id is None:
            return Response({
                "message": "All fields required",
                "result": False
            }, status=status.HTTP_400_BAD_REQUEST)

        user_course = UserCourse.objects.get(pk=summary_id)
        user_course.rank = rank
        user_course.status = stt
        user_course.is_summarised = True
        user_course.completed_date = datetime.date.today()
        user_course.save()

        try:
            user_buy_course = UserBuyCourse.objects.get(
                course_id=user_course.course_id, user_id=user_course.user_id, status=True)
            user_buy_course.status = False
            user_buy_course.save()
        except UserBuyCourse.DoesNotExist:
            pass

        return Response({
            "userCourses": UserCourseSerializer(instance=user_course).data
        }, status=status.HTTP_200_OK)


class MultiUpdateSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        rows = self.request.data

        for row in rows:
            user_course = UserCourse.objects.get(pk=row.get('userCourseId'))
            user_course.rank = row.get('rank')
            user_course.status = row.get('status')
            user_course.is_summarised = True
            user_course.save()

        return Response({
            "result": True
        }, status=status.HTTP_200_OK)


class SearchSummary(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        name = self.request.query_params.get('name', None)
        search_type = self.request.query_params.get('type', 'a')
        courses = None
        programs = None
        if search_type == 'c' or search_type == 'a':
            courses = Course.objects.annotate(num_course_home=Count('c_homes')).filter(num_course_home__gt=0)
            if name is not None:
                courses = courses.filter(title__icontains=name)
        if search_type == 'p' or search_type == 'a':
            programs = Program.objects.annotate(
                num_student=Count('students')
            ).filter(num_student__gt=0)

            if name is not None:
                programs = programs.filter(name__icontains=name)

        return Response({
            "courses": CourseCertificateSerializer(instance=courses, many=True).data if courses is not None else None,
            "programs": ProgramCertificateSerializer(instance=programs, many=True).data if programs is not None else None
        }, status=status.HTTP_200_OK)
