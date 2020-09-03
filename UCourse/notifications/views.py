from rest_framework import permissions, generics, status
from rest_framework.response import Response

from course_homes.models import CourseHome
from courses.models import Course
from programs.models import Program
from . import serializers
from .models import Notifications


class MyNotifications(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Notifications.objects.filter(user_id=user.id).order_by('-created_date')

        return Response(
            data=serializers.NotificationsSerializer(
                instance=queryset, context=self.get_serializer_context(), many=True
            ), status=status.HTTP_200_OK
        )


class CreateForumNotification(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Notifications.objects.filter(user_id=user.id).order_by('-created_date')

        return Response(
            data=serializers.NotificationsSerializer(
                instance=queryset, context=self.get_serializer_context(), many=True
            ), status=status.HTTP_200_OK
        )


class CreateRegisterNotification(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        notification_type = self.request.data['type']
        user = self.request.user

        instance_id = self.request.data['instance_id']
        instance = None
        if notification_type == 'course':
            instance = Course.objects.get(pk=instance_id)
        if notification_type == 'program':
            instance = Program.objects.get(pk=instance_id)
        if notification_type == 'courseHome':
            instance = CourseHome.objects.get(pk=instance_id)

        