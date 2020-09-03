from rest_framework import serializers

from users.serializers import UserMinSerializer
from .models import Notifications


class NotificationsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserMinSerializer(required=False)

    class Meta:
        model = Notifications
        fields = ['id', 'type', 'content', 'is_read', 'read_date', 'created_date', 'user']