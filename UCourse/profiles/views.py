from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from api.permissions import IsOwnerOrReadOnly
from api.utils import uc_response
from users.models import User
from users.serializers import UserSerializer
from .models import Profile, Teacher
from .serializers import ProfileSerializer, TeacherProfileSearchSerializer
from api.utils import ImageUploadParser


class ProfileAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name',]


class ProfileDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self):
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist as e:
            return None

    def get(self, request, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response(
                uc_response(None, 'Profile not found for user', False, None, 404),
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(instance)
        return Response(
            uc_response(serializer.data, None, True, None, 200),
            status=status.HTTP_200_OK
        )


class TeacherListAPI(generics.ListAPIView):
    serializer_class = TeacherProfileSearchSerializer
    queryset = Teacher.objects.all().order_by('first_name')


class PublicUserProfile(generics.RetrieveAPIView):
    lookup_field = 'username'
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if (self.request.user.is_anonymous and serializer.data['public_info']) or self.request.user.id == serializer.data['id']:
            return Response(serializer.data)
        return Response({
            "result": False,
            "message": "User not allow public info",
            "status": 401
        }, status=status.HTTP_200_OK)
