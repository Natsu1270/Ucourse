import datetime

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Count

from admin.serializers import TopCourseSerializer
from course_homes.models import LearningTopic, Assignment, TopicAsset, CourseHome
from courses.models import Course, UserBuyCourse, UserViewCourse
from courses.serializers import CourseDataSerializer, UserBuyCourseSerializer, UserBuyCourseDataSerializer, \
    CourseMinSerializer
from exams.models import Exam
from programs.models import Program, UserBuyProgram
from programs.serializers import ProgramDataSerializer, UserBuyProgramSerializer
from users.models import User
from users.serializers import UserDataSerializer


class GetAdminUserData(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        current_year = datetime.datetime.now().year
        first_date = datetime.date(current_year, 1, 1)
        users = User.objects.all()

        user_count = users.count()
        admin_count = users.filter(role_id=1).count()
        teacher_count = users.filter(role_id=2).count()
        ta_count = users.filter(role_id=4).count()
        student_count = users.filter(role_id=3).count()
        users = User.objects.filter(date_joined__gt=first_date)
        data = UserDataSerializer(instance=users, many=True).data
        return Response(
            {
                "userCount": user_count,
                "adminCount": admin_count,
                "teacherCount": teacher_count,
                "taCount": ta_count,
                "studentCount": student_count,
                "users": data
            }, status=status.HTTP_200_OK
        )


class GetAdminProgramCourseData(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        top_course_list = []
        top_view_list = []
        top_courses = UserBuyCourse.objects.all().values('course_id').annotate(total=Count('course_id')).order_by('-total')[:5]
        top_view_courses = UserViewCourse.objects.all().values('course_id').annotate(total=Count('course_id')).order_by('-total')[:5]

        for course in top_courses:
            try:
                obj = Course.objects.get(pk=course['course_id'])
                top_course_list.append({
                    "course": obj.title,
                    "buyCount": course['total'],
                    "viewCount": obj.view_count
                })
            except Course.DoesNotExist:
                pass

        for course in top_view_courses:
            try:
                obj = Course.objects.get(pk=course['course_id'])
                top_view_list.append({
                    "course": obj.title,
                    "viewCount": obj.view_count
                })
            except Course.DoesNotExist:
                pass

        programs = Program.objects.all()
        courses = Course.objects.all()
        program_count = programs.count()
        course_count = courses.count()
        topic_count = LearningTopic.objects.all().count()
        exam_count = Exam.objects.all().count()
        assignment_count = Assignment.objects.all().count()
        topic_asset_count = TopicAsset.objects.filter(assignment=None, student_assignment=None).count()
        course_home_count = CourseHome.objects.all().count()

        return Response(
            {
                "topCourses": TopCourseSerializer(instance=top_course_list, many=True).data,
                "topViewCourses": TopCourseSerializer(instance=top_view_list, many=True).data,
                "courses": CourseDataSerializer(instance=courses, many=True).data,
                "programs": ProgramDataSerializer(instance=programs, many=True).data,
                "programCount": program_count,
                "courseCount": course_count,
                "topicCount": topic_count,
                "examCount": exam_count,
                "assignmentCount": assignment_count,
                "lectureCount": topic_asset_count,
                "classCount": course_home_count
            }, status=status.HTTP_200_OK
        )


class GetAdminIncomeData(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        course_buys = UserBuyCourse.objects.all()
        program_buys = UserBuyProgram.objects.all()

        return Response({
            "buyCourses": UserBuyCourseSerializer(instance=course_buys, many=True).data,
            "buyPrograms": UserBuyProgramSerializer(instance=program_buys, many=True).data
        }, status=status.HTTP_200_OK)