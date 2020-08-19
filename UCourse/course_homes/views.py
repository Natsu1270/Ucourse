from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, JSONParser

import datetime

from api.permissions import IsTeacherOrTARoleOrReadOnly

from . import serializers
from course_homes.models import CourseHome, LearningTopic, TopicAsset, Assignment, StudentAssignment


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
            Q(course_id=course_id) & Q(students__in=[
                request.user]) & ~Q(status__exact='closed')
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

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}


class CreateLearningTopic(generics.CreateAPIView):
    serializer_class = serializers.LearningTopicSerializer
    queryset = LearningTopic.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class CreateTopicAsset(generics.CreateAPIView):
    serializer_class = serializers.TopicAssetSerializer
    queryset = TopicAsset.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class EditTopicAsset(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.TopicAssetSerializer
    queryset = TopicAsset.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
    ]
    parser_classes = [MultiPartParser, JSONParser]


class EditLearningTopic(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.LearningTopicSerializer
    queryset = LearningTopic.objects.all()
    permission_classes = [
        IsTeacherOrTARoleOrReadOnly
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

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None}
        return {"user": user}


class CheckClassOwnership(generics.GenericAPIView):

    def post(self, request):
        cls = request.data['slug']
        user = self.request.user
        course_home = CourseHome.objects.get(slug=cls)
        if not user.is_anonymous and course_home.students.filter(pk=user.id).exists():
            return Response({
                "result": True,
                "status_code": 200
            }, status=status.HTTP_200_OK)
        return Response({
            "result": False,
            "status_code": 400
        }, status=status.HTTP_400_BAD_REQUEST)


class AssigmentListAPI(generics.ListCreateAPIView):
    serializer_class = serializers.AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Assignment.objects.all()
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request, *args, **kwargs):
        files = request.data.getlist('file[]')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        assignment = serializer.save()

        for file in files:
            asset = TopicAsset.objects.create(
                name=assignment.name + '-' + file.name, file=file, assignment=assignment)
            # assignment.assigment_files.add(asset)

        return Response({
            "data": serializers.AssignmentSerializer(instance=assignment).data,
            "result": True,
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class AssignmentDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Assignment.objects.all()
    parser_classes = [MultiPartParser, JSONParser]

    def patch(self, request, *args, **kwargs):
        assignment = self.get_object()
        files = request.data.getlist('file[]')
        for file in files:
            asset = TopicAsset.objects.create(
                name=assignment.name + '-' + file.name, file=file, assignment=assignment)
        return self.partial_update(request, *args, **kwargs)


class StudentAssignmentAPI(generics.RetrieveAPIView):
    serializer_class = serializers.StudentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        assignment = self.request.query_params['assignment']
        try:
            instance = StudentAssignment.objects.get(
                Q(student=self.request.user) & Q(assignment_id=assignment))
            return instance
        except ObjectDoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            return Response({
                "data": serializers.StudentAssignmentSerializer(instance=instance, context={'request': request}).data,
                "result": True,
                "status_code": 200
            }, status=status.HTTP_200_OK)
        return Response({
            "result": False,
            "status_code": 404
        }, status=status.HTTP_200_OK)


class SubmitAssignmentAPI(generics.GenericAPIView):
    serializer_class = serializers.StudentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = StudentAssignment.objects.all()
    parser_classes = [JSONParser, MultiPartParser]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        student_assignment_id = request.data['studentAssignment']
        assignment = request.data['assignment']
        files = request.data.getlist('files[]')

        if student_assignment_id is None or student_assignment_id == 'undefined':
            student_assignment = StudentAssignment.objects.create(
                assignment_id=int(assignment), student=user, status=1)
        else:
            student_assignment = StudentAssignment.objects.get(pk=int(student_assignment_id))

        student_assignment.submit_time = student_assignment.submit_time + 1
        student_assignment.save()

        for file in files:
            assignment_file = TopicAsset.objects.create(
                name=file.name, file=file, student_assignment=student_assignment
            )

        return Response({
            "data": serializers.StudentAssignmentSerializer(instance=student_assignment).data,
            "result": True,
            "status_code": 201
        }, status=status.HTTP_201_CREATED)



