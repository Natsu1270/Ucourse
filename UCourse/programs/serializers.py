from rest_framework import serializers

from users.serializers import UserMinSerializer
from .models import Program, Field, UserBuyProgram, StudentProgram
from courses.serializers import CourseSerializer, CourseSearchSerializer, CourseMinSerializer


class ProgramSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    program_course = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon', 'slug', 'program_course',
            'status', 'field', 'created_date', 'discount',
            'short_description', 'full_description', 'created_date', 'created_by',
            'created_by_name', 'modified_date'
        ]
        read_only_fields = ('created_date', 'modified_date',
                            'created_by', 'created_by_name')


class ProgramDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    program_course = CourseSearchSerializer(many=True, read_only=True)
    courses_count = serializers.IntegerField(read_only=True)
    is_my_program = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    bought_courses = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon', 'slug', 'discount', 'price',
            'program_course', 'benefits', 'pre_requisites',
            'courses_count', 'status', 'field', 'bought_courses',
            'short_description', 'full_description', 'is_my_program'
        ]

    def get_is_my_program(self, obj):
        user = self.context.get('user')
        return obj.user_buy.filter(pk=user.id).count() > 0

    def get_price(self, obj):
        price = 0
        user = self.context.get('user')
        program_courses = obj.program_course.all()
        for course in program_courses:
            if course.check_is_bought(user) is not True:
                price += int(course.get_price())
        if obj.discount:
            price -= int(obj.discount)
        if obj.discount_percentage:
            price *= obj.discount_percentages
        return price

    def get_bought_courses(self, obj):
        user = self.context.get('user')
        program_courses = obj.program_course.all()
        queryset = [course for course in program_courses if course.check_is_bought(student=user)]
        return CourseMinSerializer(instance=queryset, many=True).data


class ProgramSearchSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    courses_count = serializers.IntegerField(read_only=True)
    program_course = CourseSearchSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon', 'slug', 'discount',
            'courses_count', 'status', 'field', 'program_course'
        ]


class ProgramMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    courses_count = serializers.IntegerField(read_only=True)
    program_course = CourseMinSerializer(many=True, read_only=True)
    bought_date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'code', 'icon', 'slug', 'bought_date', 'discount',
            'courses_count', 'status', 'field', 'program_course'
        ]

    def get_bought_date(self, obj):
        user = self.context.get('user')
        if user is not None:
            try:
                instance = UserBuyProgram.objects.get(user_id=user.id, program_id=obj.id)
            except UserBuyProgram.DoesNotExist:
                return None
            return instance.bought_date
        return None


class FieldSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field_programs = ProgramSearchSerializer(many=True, read_only=True)
    field_courses = CourseSearchSerializer(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Field
        fields = [
            'id', 'name', 'code', 'icon', 'description', 'field_programs', 'field_courses', 'field', 'created_date'
        ]
        read_only_fields = ('created_date',)


class FieldMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Field
        fields = [
            'id', 'name', 'code', 'slug', 'icon', 'description'
        ]


class UserBuyProgramSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())

    class Meta:
        model = UserBuyProgram
        fields = [
            'id', 'user', 'program', 'bought_date'
        ]


class StudentProgramSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserMinSerializer(required=False)
    program = ProgramMinSerializer(required=False)

    class Meta:
        model = StudentProgram
        fields = [
            'id', 'student', 'program', 'status', 'started_date', 'completed_date', 'received_certificate'
        ]
