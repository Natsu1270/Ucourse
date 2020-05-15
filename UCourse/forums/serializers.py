from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Forum, Thread, ThreadResponse
from users.serializers import UserMinSerializer, UserSerializer


class ForumSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(read_only=True)
    thread_count = serializers.SerializerMethodField()

    class Meta:
        model = Forum
        fields = [
            'id', 'name', 'info', 'thread_count',
            'course_home', 'status', 'created_date'
        ]

    def get_thread_count(self, obj):
        return obj.threads.count()


class ThreadSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    forum = serializers.PrimaryKeyRelatedField(read_only=True)
    created_by = UserMinSerializer(read_only=True)
    reply_count = serializers.SerializerMethodField()
    last_reply = serializers.SerializerMethodField()

    def get_reply_count(self, obj):
        return obj.thread_replies.count()

    def get_last_reply(self, obj):
        query = obj.thread_replies.all().order_by('timestamp').last()
        user = UserMinSerializer(query.created_by)
        data = {"created_by": user.data, "timestamp": query.timestamp}

        return data

    class Meta:
        model = Thread
        fields = [
            'id', 'name', 'forum',
            'content', 'status', 'view', 'reply_count', 'last_reply',
            'created_date', 'created_by'
        ]


class ForumDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = serializers.PrimaryKeyRelatedField(read_only=True)
    threads = ThreadSerializer(many=True, read_only=True)

    class Meta:
        model = Forum
        fields = [
            'id', 'name', 'info', 'threads',
            'course_home', 'status', 'created_date'
        ]


class ThreadResponseSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    thread = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        model = ThreadResponse
        fields = [
            'id', 'content', 'thread', 'created_by', 'timestamp'
        ]


class LastResponseSerializer(ModelSerializer):
    created_by = UserMinSerializer(read_only=True)

    class Meta:
        model = ThreadResponse
        fields = [
            'created_by', 'timestamp'
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
            return ReplyResponseSerializer(obj.children(), many=True).data
        return None
