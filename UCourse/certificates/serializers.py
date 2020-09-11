from rest_framework import serializers

from certificates.models import StudentCertificate
from courses.serializers import CourseMinSerializer
from programs.serializers import ProgramMinSerializer
from users.models import User
from course_homes.serializers import CourseHomeMinSerializer
from users.serializers import UserMinSerializer


class StudentCertificateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    student = UserMinSerializer(required=False)
    course_home = CourseHomeMinSerializer(required=False)
    course = CourseMinSerializer(required=False)
    program = ProgramMinSerializer(read_only=True)

    class Meta:
        model = StudentCertificate
        fields = [
            'id', 'student', 'course', 'course_home', 'program',
            'file', 'received_date'
        ]
