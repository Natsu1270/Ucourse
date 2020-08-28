from rest_framework import generics, permissions, status
from rest_framework.response import Response
from courses.models import UserCourse
from courses.serializers import UserCourseSerializer


class GetListSummary(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_id = self.request.query_params.get('course_id')
        class_id = self.request.query_params.get('class_id')

        queryset = UserCourse.objects.filter(course_id=course_id, course_home_id=class_id)

        return Response({
            "userCourses": UserCourseSerializer(instance=queryset, many=True).data
        }, status=status.HTTP_200_OK)


# class SearchSummary(generics.GenericAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#
#     def post(self, request, *args, **kwargs):
#         course_id = self.request.data.get('course_id')
#         class_id = self.request.data.get('class_id')
#         username = self.request.data.get('username', None)
#         name = self.request.data.get('name', None)
#         stt = self.request.data.get('status', None)
#         rank = self.request.data.get('rank', None)
#         received = self.request.data.get('received', None)
#
#         queryset = UserCourse.objects.filter(course_id=course_id, course_home_id=class_id)
#
#         if username is not None:
#             queryset.filter(user)
#
#         return Response({
#             "userCourses": UserCourseSerializer(instance=queryset, many=True).data
#         }, status=status.HTTP_200_OK)