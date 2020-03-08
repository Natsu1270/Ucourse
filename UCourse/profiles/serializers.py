from rest_framework import serializers
from .models import Profile
from users.serializers import UserSerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ('user','created_date')
