from rest_framework import serializers
from .models import Profile, Teacher


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    fullname = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'fullname', 'avatar',
                  'phone_number', 'birth_date', 'gender', 'email',
                  'bio', 'address', 'is_teacher', 'is_student',
                  'university', 'major', 'occupation', 'public_info')
        read_only_fields = ('user', 'created_date')


class TeacherProfileSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    fullname = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = Teacher
        fields = ('id', 'fullname', 'email')
