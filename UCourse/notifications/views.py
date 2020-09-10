from datetime import datetime

from rest_framework import permissions, generics, status
from rest_framework.response import Response

from courses.models import FavoriteCourse
from . import serializers
from .models import Notification


class MyNotifications(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Notification.objects.filter(user=user).order_by('-created_date')
        fav_course_count = FavoriteCourse.objects.filter(user=user).count()

        return Response(
            data={
                "notifications": serializers.NotificationsSerializer(
                    instance=queryset, context=self.get_serializer_context(), many=True
                ).data,
                "favCourseCount": fav_course_count
            }, status=status.HTTP_200_OK
        )


class ReadNotification(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        id = self.request.data['id']
        instance = Notification.objects.get(pk=id)
        instance.is_read = True
        instance.read_date = datetime.now()
        instance.save()
        return Response(
            {"result": True}, status=status.HTTP_200_OK
        )


class CreateForumNotification(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Notification.objects.filter(user_id=user.id).order_by('-created_date')

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
        instance_id = self.request.data['instanceId']

        Notification.objects.create(user=user, type=notification_type, reference=instance_id)

        return Response({
            "result": True
        }, status=status.HTTP_201_CREATED)
