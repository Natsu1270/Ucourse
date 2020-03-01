from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from . import serializers


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPI(generics.GenericAPIView):
    serializer_class = serializers.RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        user = serializer.save()
        return Response({
            "data": {
                "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            },
            "result": True,
            "message": "Register successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class LoginAPI(generics.GenericAPIView):
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "data": {
                "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            },
            "result": True,
            "message": "Login successfully",
            "status_code": 200
        }, status=status.HTTP_200_OK)
