from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, JSONParser

import datetime

from api.permissions import IsTeacherOrTARoleOrReadOnly
from courses.models import Course, UserCourse
from courses.serializers import UserCourseSerializer

from . import serializers
from course_homes.models import CourseHome, LearningTopic, TopicAsset, Assignment, StudentAssignment, StudentNote
from .serializers import StudentNoteSerializer


class RegisterClassAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        can_register = True
        class_id = request.data['class_id']
        course_id = request.data['course_id']
        course_home = CourseHome.objects.get(pk=class_id)

        # get registered class
        if course_home.students.count() >= course_home.maximum_number:
            return Response({
                "data": {},
                "result": can_register,
                "message": "Full students",
                "status_code": 400
            }, status=status.HTTP_400_BAD_REQUEST)

        registered_class = CourseHome.objects.filter(
            Q(course_id=course_id) & Q(students__in=[
                request.user]) & ~Q(status__exact='closed')
        )
        if registered_class.count() > 0:
            for c in registered_class:
                # check student class is in progress
                if c.open_date <= datetime.date.today():
                    can_register = False
                    break
                else:
                    c.students.remove(request.user)
                    c.save()

        if can_register:
            user_course = UserCourse.objects.filter(course_id=course_id, user_id=user.id)
            if user_course.count() == 0:
                UserCourse.objects.create(course_id=course_id, user_id=user.id, course_home_id=class_id)
            else:
                user_course = user_course[0]
                user_course.course_home_id = class_id
                user_course.save()

            course_home.students.add(request.user)
            course_home.save()
            return Response({
                "data": {},
                "result": can_register,
                "message": "Register Successfully",
                "status_code": 200
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "data": {},
                "result": can_register,
                "message": "Cannot register because you already in inprogressing class",
                "status_code": 400
            }, status=status.HTTP_400_BAD_REQUEST)


class UnRegisterClassAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        class_id = request.data['class_id']
        course_id = request.data['course_id']
        course = Course.objects.get(pk=course_id)
        course_home = CourseHome.objects.get(pk=class_id)
        course.users.remove(user)
        course_home.students.remove(request.user)
        course.save()
        course_home.save()

        return Response({
            "data": {},
            "result": True,
            "message": "UnRegister Successfully",
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UserCourseHomeListAPI(generics.ListAPIView):
    serializer_class = serializers.CourseHomeMinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CourseHome.objects.filter(students__in=[self.request.user])


class CourseHomeDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    serializer_class = serializers.CourseHomeSerializer
    queryset = CourseHome.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}


class CreateLearningTopic(generics.CreateAPIView):
    serializer_class = serializers.LearningTopicSerializer
    queryset = LearningTopic.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class CreateTopicAsset(generics.CreateAPIView):
    serializer_class = serializers.TopicAssetSerializer
    queryset = TopicAsset.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class EditTopicAsset(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.TopicAssetSerializer
    queryset = TopicAsset.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class EditLearningTopic(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.LearningTopicSerializer
    queryset = LearningTopic.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]


class CreateNote(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        content = self.request.data['content']
        topic_asset_id = self.request.data['topicAsset']
        user_id = self.request.user.id
        instance = StudentNote.objects.create(content=content, topic_asset_id=topic_asset_id, student_id=user_id)

        return Response({
            "note": StudentNoteSerializer(instance=instance).data,
            "result": True
        }, status=status.HTTP_201_CREATED)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentNoteSerializer()
    queryset = StudentNote.objects.all()


class CourseHomeShowAPI(generics.ListAPIView):
    serializer_class = serializers.CourseHomeShowSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get_queryset(self):
        course_id = self.request.query_params['course_id']
        return CourseHome.objects.filter(course_id=course_id)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None}
        return {"user": self.request.user}


class CourseHomeDetailShowAPI(generics.RetrieveAPIView):
    serializer_class = serializers.CourseHomeShowSerializer
    lookup_field = 'slug'
    queryset = CourseHome.objects.all()

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None}
        return {"user": user}


class CheckClassOwnership(generics.GenericAPIView):

    def post(self, request):
        cls = request.data['slug']
        user = self.request.user
        course_home = CourseHome.objects.get(slug=cls)
        if not user.is_anonymous and course_home.students.filter(pk=user.id).exists():
            return Response({
                "result": True,
                "status_code": 200
            }, status=status.HTTP_200_OK)
        return Response({
            "result": False,
            "status_code": 400
        }, status=status.HTTP_400_BAD_REQUEST)


class GetListSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_id = self.request.query_params.get('course_id')
        class_id = self.request.query_params.get('class_id')

        queryset = UserCourse.objects.filter(course_id=course_id, course_home_id=class_id)

        return Response({
            "userCourses": UserCourseSerializer(instance=queryset, many=True).data
        }, status=status.HTTP_200_OK)




