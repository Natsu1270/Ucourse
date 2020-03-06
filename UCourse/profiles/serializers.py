from rest_framework import serializers
from .models import Profile
from users.serializers import UserSerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['role']
