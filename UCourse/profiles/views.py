from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from api.permissions import IsOwnerOrReadOnly
from api.utils import uc_response
from .models import Profile
from .serializers import ProfileSerializer
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
    parser_classes = [MultiPartParser]

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


