from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
import datetime

from . import serializers
from course_homes.models import CourseHome


class RegisterClassAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    @staticmethod
    def post(request):
        can_register = True
        class_id = request.data['class_id']
        course_id = request.data['course_id']
        course_home = CourseHome.objects.get(pk=class_id)
        # get registered class
        registered_class = CourseHome.objects.filter(
            Q(course_id=course_id) & Q(students__in=[request.user]) & ~Q(status__exact='closed')
        )
        if registered_class.count() > 0:
            for c in registered_class:
                # check student class is in progress
                if c.open_date <= datetime.date.today():
                    can_register = False
                    break
                else:
                    c.students.remove(request.user)
                    c.save()

        course_home.students.add(request.user)
        course_home.save()

        if can_register:
            return Response({
                "data": {},
                "result": can_register,
                "message": "Register Successfully",
                "status_code": 200
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "data": {},
                "result": can_register,
                "message": "Cannot register because you already in inprogressing class",
                "status_code": 400
            }, status=status.HTTP_400_BAD_REQUEST)


class UnRegisterClassAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    @staticmethod
    def post(request):
        class_id = request.data['class_id']
        course_home = CourseHome.objects.get(pk=class_id)
        course_home.students.remove(request.user)
        course_home.save()

        return Response({
            "data": {},
            "result": True,
            "message": "UnRegister Successfully",
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UserCourseHomeListAPI(generics.ListAPIView):
    serializer_class = serializers.CourseHomeMinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CourseHome.objects.filter(students__in=[self.request.user])


class CourseHomeDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    serializer_class = serializers.CourseHomeSerializer
    queryset = CourseHome.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]


class CourseHomeShowAPI(generics.ListAPIView):
    serializer_class = serializers.CourseHomeShowSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get_queryset(self):
        course_id = self.request.query_params['course_id']
        return CourseHome.objects.filter(course_id=course_id)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None}
        return {"user": self.request.user}


class CourseHomeDetailShowAPI(generics.RetrieveAPIView):
    serializer_class = serializers.CourseHomeShowSerializer
    lookup_field = 'slug'
    queryset = CourseHome.objects.all()