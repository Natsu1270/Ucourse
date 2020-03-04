from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login

from roles.serializers import RoleSerializer


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(many=False)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'date_joined', 'is_active','role')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'username')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        user = get_user_model().objects.create_user(email, password, username)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            update_last_login(sender=None, user=user)
            return user
        raise serializers.ValidationError("Incorrect email or password")
