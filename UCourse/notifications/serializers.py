from rest_framework import serializers

from course_homes.models import CourseHome
from course_homes.serializers import CourseHomeMinSerializer
from courses.models import Course
from courses.serializers import CourseMinSerializer
from exams.models import Exam
from exams.serializers import ExamSerializer, ExamNotificationSerializer
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
            try:
                instance = Course.objects.get(pk=reference)
                return CourseMinSerializer(instance=instance).data
            except Course.DoesNotExist:
                return None
        if obj.type == '2':
            try:
                instance = Program.objects.get(pk=reference)
                return ProgramMinSerializer(instance=instance).data
            except Program.DoesNotExist:
                return None
        if obj.type == '3':
            try:
                instance = CourseHome.objects.get(pk=reference)
                return CourseHomeMinSerializer(instance=instance).data
            except CourseHome.DoesNotExist:
                return None

        if obj.type == '4':
            try:
                instance = Forum.objects.get(pk=reference)
                return ForumSerializer(instance=instance).data
            except Forum.DoesNotExist:
                return None
        if obj.type == '5':
            try:
                instance = Thread.objects.get(pk=reference)
                return ThreadSerializer(instance=instance).data
            except Thread.DoesNotExist:
                return None
        if obj.type == "6":
            try:
                instance = Exam.objects.get(pk=reference)
                return ExamNotificationSerializer(instance=instance).data
            except Exam.DoesNotExist:
                return None
