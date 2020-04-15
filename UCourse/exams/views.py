from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from django.db.models import Q
from .models import AbilityTest, UserAbilityTest
from . import serializers


class AbilityTestListAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.AbilityTestSerializer
    queryset = AbilityTest.objects.all()


class AbilityTestDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.AbilityTestSerializer
    queryset = AbilityTest.objects.all()


class UserAbilityTestListAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestMinSerializer
    queryset = UserAbilityTest.objects.all().order_by('-date_taken')


class UserAbilityTestPrivateListAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestMinSerializer

    def get_queryset(self):
        queryset = UserAbilityTest.objects.filter(
            Q(user=self.request.user) & Q(result__isnull=False)).order_by('-id')
        return queryset


class UserAbilityTestDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestSerializer
    queryset = UserAbilityTest.objects.all()


class GenerateUserAbilityTestAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserAbilityTestSerializer
    queryset = UserAbilityTest.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user = request.user
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        user_ability_test = serializer.save(
            user=user, ability_test=data['ability_test'])
        return Response({
            "data": {
                "user_ability_test": self.get_serializer(user_ability_test).data,
            },
            "result": True,
            "message": "Login successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)
