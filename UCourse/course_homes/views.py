from rest_framework import generics, permissions, status
from rest_framework.response import Response

from . import serializers
from course_homes.models import CourseHome


class RegisterCourseAPI(generics.GenericAPIView):
    serializer_class = serializers.RegisterCourseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course_id = serializer.validated_data['course_id']
        course_home = CourseHome.objects.get(course_id=course_id)
        course_home.students.add(request.user)
        course_home.save()

        return Response({
            "data": {

            },
            "result": True,
            "message": "Register Successfully",
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UserCourseHomeListAPI(generics.ListAPIView):
    serializer_class = serializers.CourseHomeMinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CourseHome.objects.filter(students__in=[self.request.user])
