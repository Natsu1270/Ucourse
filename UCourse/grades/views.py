from rest_framework import generics, permissions, status
from rest_framework.response import Response

from course_homes.models import StudentAssignment
from course_homes.serializers import StudentAssignmentDetailGradeSerializer
from exams.models import StudentExamResult
from exams.serializers import StudentExamResultSerializer


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


class GetAllStudentGradesAPI:
    pass