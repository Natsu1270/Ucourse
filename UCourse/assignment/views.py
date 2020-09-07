from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, JSONParser

from course_homes.models import Assignment, TopicAsset, StudentAssignment, CourseHome
from course_homes import serializers
from utils import file_utils


class AssigmentListAPI(generics.ListCreateAPIView):
    serializer_class = serializers.AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Assignment.objects.all()
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request, *args, **kwargs):
        files = request.data.getlist('file[]')
        course_home_id = request.data.get('courseHomeId')
        course_home = CourseHome.objects.get(pk=course_home_id)
        students = course_home.students.all()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        assignment = serializer.save()
        assignment.students.add(*students)
        assignment.save()

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views.add(self.request.user)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        assignment = self.get_object()
        files = request.data.getlist('file[]')
        for file in files:
            asset = TopicAsset.objects.create(
                name=assignment.name + '-' + file.name, file=file, assignment=assignment)
        return self.partial_update(request, *args, **kwargs)


class StudentAssignmentListByTopic(generics.ListAPIView):
    serializer_class = serializers.StudentAssignmentDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        topic_id = self.request.query_params['topic']
        queryset = StudentAssignment.objects.filter(assignment__learning_topic_id=topic_id)
        return queryset


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
        student_assignment.status = '1'
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


class DownloadAssignmentItem(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        filename = self.request.query_params['filename']
        student_assigment = self.request.query_params['id']
        instance = StudentAssignment.objects.get(pk=student_assigment)
        submit_files = instance.student_assignment_files.all()
        files = [file.file.path for file in submit_files]
        zip_filename, zip_file = file_utils.generate_zip_file(files, filename)

        response = HttpResponse(zip_file.getvalue(), content_type="application/zip")
        response['Content-Disposition'] = 'attachment; filename=%s' % zip_filename
        return response


class DownloadAssignmentAll(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        assignment_id = self.request.query_params['assignmentId']
        queryset = StudentAssignment.objects.filter(assignment_id=assignment_id)
        assignment = Assignment.objects.get(pk=assignment_id)

        zip_filename, zip_file = file_utils.generate_zip_all(queryset, assignment.name)

        response = HttpResponse(zip_file.getvalue(), content_type="application/zip")
        response['Content-Disposition'] = 'attachment; filename=%s' % zip_filename
        return response
