from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from api.permissions import IsOwnerOrReadOnly
from api.utils import uc_response
from .models import Event, Teacher
from .serializers import EventSerializer, TeacherEventSearchSerializer
from api.utils import ImageUploadParser


class EventAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name',]


class EventDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly
    ]
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self):
        try:
            return Event.objects.get(user=self.request.user)
        except Event.DoesNotExist as e:
            return None

    def get(self, request, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response(
                uc_response(None, 'Event not found for user', False, None, 404),
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(instance)
        return Response(
            uc_response(serializer.data, None, True, None, 200),
            status=status.HTTP_200_OK
        )


class TeacherListAPI(generics.ListAPIView):
    serializer_class = TeacherEventSearchSerializer
    queryset = Teacher.objects.all().order_by('first_name')
