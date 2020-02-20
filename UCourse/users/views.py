from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from . import serializers


class UserAPIViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer


class CreateTokenView(ObtainAuthToken):
    serializer_class = serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
