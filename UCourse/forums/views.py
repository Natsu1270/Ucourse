from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from course_homes.models import CourseHome
from notifications.models import Notification
from .models import Forum, Thread, ThreadResponse
from . import serializers
from api.utils import uc_response


class ForumListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ForumSerializer

    def post(self, request, *args, **kwargs):
        course_home_id = self.request.data['courseHomeId']
        name = self.request.data['name']
        instance = Forum.objects.create(name=name, course_home_id=course_home_id)
        try:
            course_home = CourseHome.objects.get(pk=course_home_id)
            students = course_home.students.all()
            for student in students:
                Notification.objects.create(user=student, type="4", reference=instance.id)
        except CourseHome.DoesNotExist:
            pass
        return Response(data=serializers.ForumSerializer(instance=instance).data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        course_home = self.request.query_params['course_home_id']
        queryset = Forum.objects.filter(course_home_id=course_home)
        return queryset


class ForumDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ForumDetailSerializer
    queryset = Forum.objects.all()


class ThreadListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadSerializer

    def get_queryset(self):
        forum = self.request.query_params['forum_id']
        queryset = Thread.objects.filter(forum_id=forum).order_by('-created_date')
        return queryset

    def post(self, request, *args, **kwargs):
        course_home_id = self.request.data['courseHomeId']
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        thread = serializer.save(
            created_by=request.user, forum=data['forum'], name=data['name'],
            content=data['content']
        )

        try:
            course_home = CourseHome.objects.get(pk=course_home_id)
            students = course_home.students.all()
            for student in students:
                Notification.objects.create(user=student, type="5", reference=thread.id)
        except CourseHome.DoesNotExist:
            pass


        return Response({
            "data": {},
            "result": True,
            "message": "Submit exam successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class ThreadDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadSerializer
    queryset = Thread.objects.all()


class ThreadResponseListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadResponseSerializer

    def get_queryset(self):
        thread = self.request.query_params['thread_id']
        queryset = ThreadResponse.objects.filter(thread_id=thread)
        return queryset

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        response = serializer.save(
            created_by=request.user, thread=data['thread'],
            content=data['content']
        )
        return Response({
            "data": self.get_serializer(response).data,
            "result": True,
            "message": "Reply thread successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class ThreadResponseDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadResponseDetailSerializer
    queryset = ThreadResponse.objects.all()
