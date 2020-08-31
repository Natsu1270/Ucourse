from rest_framework import serializers

from certificates.models import StudentCertificate
from course_homes.models import CourseHome
from courses.models import Course
from users.models import User
from course_homes.serializers import CourseHomeMinSerializer


class StudentCertificateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    course_home = CourseHomeMinSerializer(required=False)
    # course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = StudentCertificate
        fields = [
            'id', 'student', 'course', 'course_home',
            'file', 'received_date'
        ]
