from rest_framework import generics, permissions, status
from rest_framework.response import Response

from course_homes.models import StudentAssignment, Assignment, StudentCourseHome
from course_homes.serializers import StudentAssignmentDetailGradeSerializer, StudentAssignmentAllGradeSerializer, \
    AssignmentMinSerializer, StudentCourseHomeSerializer
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
        student_course_homes = StudentCourseHome.objects.filter(course_home_id=course_home_id)
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
            "student_course_homes": StudentCourseHomeSerializer(instance=student_course_homes, many=True).data,
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
        assignment_id = self.request.data['assignmentId']
        assignment = Assignment.objects.get(pk=assignment_id)
        pass_score = assignment.pass_score
        score = self.request.data['score']
        is_pass = score >= pass_score
        student_assignment = StudentAssignment.objects.get(pk=student_assignment_id)
        student_assignment.score = score
        student_assignment.is_pass = is_pass
        student_assignment.save()
        return Response({
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UpdateStudentCourseHomeGrade(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        student_coursehome_id = self.request.data['studentCourseHomeId']
        grade = self.request.data['grade']
        is_pass = self.request.data['isQualified']

        student_coursehome = StudentCourseHome.objects.get(pk=student_coursehome_id)
        student_coursehome.final_score = grade
        student_coursehome.status = 'pass' if is_pass else 'fail'
        student_coursehome.save()

        return Response({
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UpdateMultiStudentCourseHomeGrade(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        rows = self.request.data
        for row in rows:
            student_coursehome = StudentCourseHome.objects.get(pk=row.get('key'))
            student_coursehome.final_score = row.get('result')
            is_pass = row.get('isQualified')
            student_coursehome.status = 'pass' if is_pass else 'fail'
            student_coursehome.save()

        return Response({
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)
