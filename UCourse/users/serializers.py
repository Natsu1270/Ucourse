from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login

from roles.serializers import RoleSerializer
from roles.models import Role
from profiles.serializers import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, read_only=True)
    role = RoleSerializer(many=False, read_only=True)
    user_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password', 'is_social_account', 'user_profile',
                  'date_joined', 'is_active', 'role')
        extra_kwargs = {'password': {'write_only': True}, }
        read_only_fields = ('id', 'date_joined', 'is_active',)

    def update(self, instance, validated_data):
        role = validated_data.pop('role', False)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if role:
            role = Role.objects.filter(code=role.get('code')).first()
            instance.role = role
        instance.save()

        return instance


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'username')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        user = get_user_model().objects.create_student(email, password, username)

        return user


class TeacherRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'username')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        user = get_user_model().objects.create_teacher(email, password, username)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            update_last_login(sender=None, user=user)
            return user
        raise serializers.ValidationError('Incorrect email or password')



class HandleSocialAccount(serializers.Serializer):
    email = serializers.CharField()
    username = serializers.CharField(required=False)
    uid = serializers.CharField(required=True)



class UpdateAccountSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    old_password = serializers.CharField(required=True)
    password = serializers.CharField()

    def update(self, instance, validated_data):
        role = validated_data.pop('role', False)
        new_password = validated_data.get('password')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if new_password:
            instance.set_password(new_password)
        if role:
            role = Role.objects.filter(code=role.get('code')).first()
            instance.role = role
        instance.save()

        return instance
