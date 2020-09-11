from rest_framework import serializers

from courses.models import UserBuyCourse
from courses.serializers import CourseMinSerializer
from programs.models import UserBuyProgram
from programs.serializers import ProgramMinSerializer


class UserBuyCourseSerializer(serializers.ModelSerializer):
    course = CourseMinSerializer(read_only=True)

    class Meta:
        model = UserBuyCourse
        fields = ['id', 'money', 'bought_date', 'in_program', 'status', 'course']


class UserBuyProgramSerializer(serializers.ModelSerializer):
    program = ProgramMinSerializer(read_only=True)

    class Meta:
        model = UserBuyProgram
        fields = ['id', 'money', 'bought_date', 'program']