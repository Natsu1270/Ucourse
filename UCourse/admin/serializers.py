from rest_framework import serializers

from users.serializers import UserDataSerializer


class AdminUserDataSerializer(serializers.Serializer):
    user_count = serializers.IntegerField(read_only=True)
    users = UserDataSerializer(many=True)


class TopCourseSerializer(serializers.Serializer):
    course = serializers.CharField()
    buyCount = serializers.IntegerField(required=False)
    viewCount = serializers.IntegerField(required=False)