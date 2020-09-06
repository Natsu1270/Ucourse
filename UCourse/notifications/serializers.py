from rest_framework import serializers

from course_homes.models import CourseHome
from course_homes.serializers import CourseHomeMinSerializer
from courses.models import Course
from courses.serializers import CourseMinSerializer
from exams.models import Exam
from exams.serializers import ExamSerializer
from forums.models import Forum, Thread
from forums.serializers import ForumSerializer, ThreadSerializer
from programs.models import Program
from programs.serializers import ProgramMinSerializer
from users.serializers import UserMinSerializer
from .models import Notification


class NotificationsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserMinSerializer(required=False)
    reference_object = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id', 'type', 'content', 'is_read', 'reference', 'reference_object', 'read_date', 'created_date', 'user'
        ]

    def get_reference_object(self, obj):
        reference = obj.reference
        if obj.type == '1':
            instance = Course.objects.get(pk=reference)
            return CourseMinSerializer(instance=instance).data
        if obj.type == '2':
            instance = Program.objects.get(pk=reference)
            return ProgramMinSerializer(instance=instance).data
        if obj.type == '3':
            instance = CourseHome.objects.get(pk=reference)
            return CourseHomeMinSerializer(instance=instance).data
        if obj.type == '4':
            instance = Forum.objects.get(pk=reference)
            return ForumSerializer(instance=instance).data
        if obj.type == '5':
            instance = Thread.objects.get(pk=reference)
            return ThreadSerializer(instance=instance).data
        if obj.type == "6":
            instance = Exam.objects.get(pk=reference)
            return ExamSerializer(instance=instance).data
