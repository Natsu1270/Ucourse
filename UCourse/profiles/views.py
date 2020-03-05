from rest_framework import generics, permissions, status
from rest_framework.response import Response
from api.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileListAPI(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class CreateProfileAPI(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly
    ]
    serializer_class = ProfileSerializer


class RUDProfileAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
