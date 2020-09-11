from datetime import datetime

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from course_homes.models import StudentAssignment, Assignment, StudentCourseHome
from course_homes.serializers import StudentAssignmentDetailGradeSerializer, StudentAssignmentAllGradeSerializer, \
    AssignmentMinSerializer, StudentCourseHomeSerializer
from courses.models import UserCourse
from courses.serializers import UserCourseSerializer
from exams.models import StudentExamResult, Exam
from exams.serializers import StudentExamResultSerializer, ExamMinSerializer


class GetStudentGradesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_home_id = self.request.query_params['courseHomeId']
        user = self.request.user
        student_exams = StudentExamResult.objects.filter(student_id=user.id, course_home_id=course_home_id)
        student_assignments = StudentAssignment.objects.filter(
            student_id=user.id, assignment__learning_topic__course_home_id=course_home_id)
        final_score = None
        class_status = None

        course_home_exams = Exam.objects.filter(topic__course_home_id=course_home_id)
        course_home_assignments = Assignment.objects.filter(learning_topic__course_home_id=course_home_id)
        total_grade = 0

        for exam in course_home_exams:
            if exam.mandatory:
                total_grade += exam.max_score

        for assignment in course_home_assignments:
            if assignment.mandatory:
                total_grade += assignment.max_score
        try:
            student_course_home = StudentCourseHome.objects.get(student=user, course_home_id=course_home_id)
            final_score = student_course_home.final_score
            class_status = student_course_home.status
        except StudentCourseHome.DoesNotExist:
            pass

        return Response({
            "student_exams": StudentExamResultSerializer(instance=student_exams, many=True).data,
            "student_assignments": StudentAssignmentDetailGradeSerializer(instance=student_assignments, many=True).data,
            "total_grade": total_grade,
            "final_score": final_score,
            "class_status": class_status,
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)


class GetAllStudentGradesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        course_home_id = self.request.query_params['courseHomeId']

        course_home_exams = Exam.objects.filter(topic__course_home_id=course_home_id)
        course_home_assignments = Assignment.objects.filter(learning_topic__course_home_id=course_home_id)
        student_course_homes = StudentCourseHome.objects.filter(course_home_id=course_home_id)
        user_courses = UserCourse.objects.filter(course_home_id=course_home_id)
        filter_exams = {}
        filter_assignments = {}
        total_grade = 0
        for exam in course_home_exams:
            if exam.mandatory:
                total_grade += exam.max_score
            student_exams = StudentExamResult.objects.filter(exam_id=exam.id)
            filter_exams[exam.name] = [ExamMinSerializer(instance=exam).data,
                                       StudentExamResultSerializer(instance=student_exams, many=True).data]

        for assignment in course_home_assignments:
            if assignment.mandatory:
                total_grade += assignment.max_score
            student_assignments = StudentAssignment.objects.filter(assignment_id=assignment.id)
            filter_assignments[assignment.name] = [AssignmentMinSerializer(instance=assignment).data,
                                                   StudentAssignmentAllGradeSerializer(instance=student_assignments,
                                                                                       many=True).data]

        return Response({
            "student_exams": filter_exams,
            "student_assignments": filter_assignments,
            "student_course_homes": StudentCourseHomeSerializer(instance=student_course_homes, many=True).data,
            "user_courses": UserCourseSerializer(instance=user_courses, many=True).data,
            "total_grade": total_grade,
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


def parse_rank_by_score(score):
    if score < 5:
        return 'bad'
    if score < 7:
        return 'medium'
    if score < 9:
        return 'good'
    return 'xgood'


class UpdateStudentCourseHomeGrade(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]



    def post(self, request, *args, **kwargs):
        student_coursehome_id = self.request.data['studentCourseHomeId']
        student_id = self.request.data.get('studentId')
        grade = self.request.data['grade']
        is_pass = self.request.data['isQualified']
        rank = parse_rank_by_score(int(float(grade)))

        student_coursehome = StudentCourseHome.objects.get(pk=student_coursehome_id)
        user_course = UserCourse.objects.get(user_id=student_id, course_home_id=student_coursehome.course_home_id)
        student_coursehome.final_score = grade
        student_coursehome.rank = rank
        student_coursehome.status = 'pass' if is_pass else 'fail'
        student_coursehome.save()
        user_course.status = 'pass' if is_pass else 'fail'
        user_course.rank = rank
        user_course.is_summarised = True
        user_course.completed_date = datetime.today()
        user_course.save()
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
            user_course = UserCourse.objects.get(user_id=student_coursehome.student_id, course_home_id=student_coursehome.course_home_id)
            score = row.get('result')
            rank = parse_rank_by_score(int(float(score)))
            student_coursehome.final_score = score
            is_pass = row.get('isQualified')
            student_coursehome.status = 'pass' if is_pass else 'fail'
            student_coursehome.rank = rank
            student_coursehome.save()

            user_course.rank = rank
            user_course.status = 'pass' if is_pass else 'fail'
            user_course.is_summarised = True
            user_course.completed_date = datetime.today()
            user_course.save()

        return Response({
            "result": True,
            "status_code": 200
        }, status=status.HTTP_200_OK)
