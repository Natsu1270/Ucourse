from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Forum, Thread, ThreadResponse


class ForumSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Forum
        fields = [
            'id', 'name', 'info',
            'course_home', 'status', 'created_date'
        ]


class ThreadSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    forum = serializers.PrimaryKeyRelatedField(read_only=True)
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Thread
        fields = [
            'id', 'name', 'forum',
            'info', 'status', 'view',
            'created_date', 'created_by'
        ]


class ThreadResponseSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    thread = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ThreadResponse
        fields = [
            'id', 'content', 'thread', 'created_by', 'timestamp'
        ]


class ReplyResponseSerializer(ModelSerializer):

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ThreadResponse
        fields = [
            'id', 'content', 'timestamp', 'created_by'
        ]


class ThreadResponseDetailSerializer(ModelSerializer):
    replies = serializers.SerializerMethodField()
    is_parent = serializers.BooleanField()

    class Meta:
        model = ThreadResponse
        fields = [
            'id', 'content', 'timestamp', 'replies', 'is_parent'
        ]

    def get_replies(self, obj):
        if obj.is_parent:
            return ReplyResponseSerializer(obj.children(),many=True).data
        return None
