from rest_framework import generics, permissions
from .serializers import CourseSerializer, CourseDetailSerializer
from api.permissions import IsTeacherOrTARoleOrReadOnly
from .models import Course, CourseDetail


class CourseListView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]