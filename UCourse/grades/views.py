from rest_framework import generics, permissions, status
from rest_framework.response import Response

from course_homes.models import StudentAssignment, Assignment
from course_homes.serializers import StudentAssignmentDetailGradeSerializer, StudentAssignmentAllGradeSerializer, \
    AssignmentMinSerializer
from exams.models import StudentExamResult, Exam
from exams.serializers import StudentExamResultSerializer, ExamMinSerializer


class GetStudentGradesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_home_id = self.request.query_params['courseHomeId']
        user = self.request.user
        student_exams = StudentExamResult.objects.filter(student_id=user.id, course_home_id=course_home_id)
        student_assignments = StudentAssignment.objects.filter(student_id=user.id)

        return Response({
            "student_exams": StudentExamResultSerializer(instance=student_exams, many=True).data,
            "student_assignments": StudentAssignmentDetailGradeSerializer(instance=student_assignments, many=True).data,
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)


class GetAllStudentGradesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        course_home_id = self.request.query_params['courseHomeId']

        course_home_exams = Exam.objects.filter(topic__course_home__course_id=course_home_id)
        course_home_assignments = Assignment.objects.filter(learning_topic__course_home_id=course_home_id)
        filter_exams = {}
        filter_assignments = {}

        for exam in course_home_exams:
            student_exams = StudentExamResult.objects.filter(exam_id=exam.id)
            filter_exams[exam.name] = [ExamMinSerializer(instance=exam).data,
                                       StudentExamResultSerializer(instance=student_exams, many=True).data]

        for assignment in course_home_assignments:
            student_assignments = StudentAssignment.objects.filter(assignment_id=assignment.id)
            filter_assignments[assignment.name] = [AssignmentMinSerializer(instance=assignment).data,
                                                   StudentAssignmentAllGradeSerializer(instance=student_assignments,
                                                                                       many=True).data]

        return Response({
            "student_exams": filter_exams,
            "student_assignments": filter_assignments,
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)

        # return Response({
        #     "student_exams": StudentExamResultSerializer(instance=student_exams, many=True).data,
        #     "student_assignments": StudentAssignmentAllGradeSerializer(instance=student_assignments, many=True).data,
        #     "result": True,
        #     "status_code": 200
        # }, status=status.HTTP_200_OK)


class UpdateStudentAssigmentGrade(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        student_assignment_id = self.request.data['studentAssignmentId']
        score = self.request.data['score']
        student_assignment = StudentAssignment.objects.get(pk=student_assignment_id)
        student_assignment.score = score
        student_assignment.save()
        return Response({
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)
