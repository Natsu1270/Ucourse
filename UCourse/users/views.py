from rest_framework import generics, permissions, status, exceptions, views
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth import get_user_model
from . import serializers


class UserListAPI(generics.ListAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return get_user_model().objects.all()


class UserAPI(generics.RetrieveUpdateDestroyAPIView):
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


class RegisterTeacherAPI(generics.GenericAPIView):
    serializer_class = serializers.TeacherRegisterSerializer
    permission_classes = [
        permissions.IsAdminUser
    ]

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


class HandleSocialLoginAPI(views.APIView):

    def post(self, request):
        serializer = serializers.HandleSocialAccount(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        username = serializer.validated_data['username']
        social_uid = serializer.validated_data['uid']
        user_queryset = get_user_model().objects.filter(social_uid=social_uid)
        first_login = False
        profile = None
        if len(user_queryset) == 0:
            user = get_user_model().objects.create_student(email=email, username=username, social_uid=social_uid)
            first_login = True
        else:
            user = user_queryset.first()
        return Response({
            "data": {
                "user": serializers.UserSerializer(user).data,
                "token": AuthToken.objects.create(user)[1],
                "first_login": first_login,
            },
            "result": True,
            "message": "Login successfully",
            "status_code": 200
        }, status=status.HTTP_200_OK)


class UpdateAccountAPI(generics.UpdateAPIView):
    serializer_class = serializers.UpdateAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        if not instance.check_password(serializer.validated_data.get('old_password')):
            raise exceptions.AuthenticationFailed('Password provided is not correct!')
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


