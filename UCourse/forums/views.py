from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from .models import Forum, Thread, ThreadResponse
from . import serializers
from api.utils import uc_response


class ForumListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ForumSerializer

    def get_queryset(self):
        course_home = self.request.query_params['course_home_id']
        queryset = Forum.objects.filter(course_home_id=course_home)
        return queryset


class ForumDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ForumSerializer
    queryset = Forum.objects.all()


class ThreadListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadSerializer

    def get_queryset(self):
        forum = self.request.query_params['forum_id']
        queryset = Thread.objects.filter(forum_id=forum)
        return queryset


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
    queryset = ThreadResponse.objects.all()


class ThreadResponseDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.ThreadResponseDetailSerializer
    queryset = ThreadResponse.objects.all()

