from rest_framework import generics, permissions
from .serializers import CourseSerializer, CourseDetailSerializer
from api.permissions import IsTeacherOrTARoleOrReadOnly
from .models import Course, CourseDetail


class CourseListView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Course.objects.all()
        query = self.request.query_params.get('name', None)
        if query is not None:
            queryset = queryset.filter(title__icontains=query)
        return queryset


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "slug"
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]