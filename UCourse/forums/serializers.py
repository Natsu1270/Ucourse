from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from course_homes.models import CourseHome
from .models import Forum, Thread, ThreadResponse
from users.serializers import UserMinSerializer, UserSerializer


class CourseHomeForumSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'slug', 'full_name', 'teacher'
        ]


class ForumSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_home = CourseHomeForumSerializer(read_only=True)
    thread_count = serializers.SerializerMethodField()
    created_date = serializers.DateTimeField()

    class Meta:
        model = Forum
        fields = [
            'id', 'name', 'info', 'thread_count',
            'course_home', 'status', 'created_date'
        ]

    @staticmethod
    def get_thread_count(obj):
        return obj.threads.count()


class ThreadResponseSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    thread = serializers.PrimaryKeyRelatedField(queryset=Thread.objects.all(), required=False)
    created_by = UserMinSerializer(read_only=True, required=False)

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
    is_parent = serializers.BooleanField(required=False)

    class Meta:
        model = ThreadResponse
        fields = [
            'id', 'content', 'timestamp', 'replies', 'is_parent'
        ]

    @staticmethod
    def get_replies(obj):
        if obj.is_parent:
            return ReplyResponseSerializer(obj.children(), many=True).data
        return None


class ThreadSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    created_by = UserMinSerializer(read_only=True, required=False)
    reply_count = serializers.SerializerMethodField(read_only=True, required=False)
    last_reply = serializers.SerializerMethodField(read_only=True, required=False)
    thread_replies = ThreadResponseSerializer(many=True, read_only=True, required=False)
    course_home = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_course_home(obj):
        course_home = obj.forum.course_home
        return CourseHomeForumSerializer(instance=course_home).data

    @staticmethod
    def get_reply_count(obj):
        return obj.thread_replies.count()

    @staticmethod
    def get_last_reply(obj):
        query = obj.thread_replies.all().order_by('timestamp').last()
        data = {"created_by": UserMinSerializer(query.created_by).data, "timestamp": query.timestamp} if query is not None else None

        return data

    class Meta:
        model = Thread
        fields = [
            'id', 'name', 'forum', 'thread_replies', 'course_home',
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