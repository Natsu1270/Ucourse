from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    fullname = serializers.CharField()
    
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'fullname', 'avatar',
                  'phone_number', 'birth_date', 'gender',
                  'bio', 'address', 'is_teacher', 'is_student',
                  'university', 'major', 'occupation', 'public_info')
        read_only_fields = ('user', 'created_date')
