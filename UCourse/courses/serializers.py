from rest_framework import serializers, exceptions
from django.db.models import Q
from programs.models import UserBuyProgram
from users.models import User
from users.serializers import UserMinSerializer
from .models import Course, CourseDetail, Skill, UserBuyCourse, UserViewCourse, UserCourse
from course_homes.models import CourseHome, StudentCourseHome
from profiles.serializers import ProfileMinSerializer


class CourseMinSerializer(serializers.ModelSerializer):
    is_my_course = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'icon', 'status', 'is_my_course',
        ]

    def get_is_my_course(self, obj):
        user = self.context.get('user')
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False


class UserBuyCourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.StringRelatedField(required=False)
    course = serializers.StringRelatedField(required=False)
    money = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserBuyCourse
        fields = ['id', 'user', 'course', 'bought_date', 'money']

    @staticmethod
    def get_money(obj):
        return obj.course.get_price()


class UserBuyCourseDataSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course = CourseMinSerializer(required=False)

    class Meta:
        model = UserBuyCourse
        fields = ['id', 'course', 'bought_date']


class UserBuyProgramSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = UserBuyProgram
        fields = ['id', 'user', 'program', 'bought_date']


class UserCourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserMinSerializer(required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)
    course_home = serializers.PrimaryKeyRelatedField(queryset=CourseHome.objects.all(), required=False)
    end_date = serializers.SerializerMethodField(read_only=True)
    # final_score = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserCourse
        fields = ['id', 'user', 'course', 'course_home', 'status', 'end_date',
                  'rank', 'completed_date', 'rate', 'received_certificate', 'is_summarised']

    @staticmethod
    def get_end_date(obj):
        return obj.course_home.end_date

    # @staticmethod
    # def get_final_score(obj):
    #     student_course_home = StudentCourseHome.objects.filter(
    #         Q(student_id=obj.user.id) & Q(course_home_id=obj.course_home.id))
    #     if student_course_home.count() > 0:
    #         return student_course_home[0].final_score
    #     return None


class CourseHomeShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    teacher = ProfileMinSerializer(read_only=True)
    full_name = serializers.CharField()
    student_count = serializers.SerializerMethodField()
    is_my_class = serializers.SerializerMethodField()

    class Meta:
        model = CourseHome
        fields = [
            'id', 'status', 'name', 'full_name', 'open_date', 'end_date',
            'expected_date', 'register_date',
            'over_admission_days', 'teacher', 'maximum_number', 'student_count', 'is_my_class'
        ]

    @staticmethod
    def get_student_count(obj):
        return obj.students.count()

    def get_is_my_class(self, obj):
        user = self.context.get('user')
        check_user = CourseHome.objects.filter(students__in=[user])
        return True if check_user.count() > 0 else False


class CourseDetailSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(read_only=True)
    skills = serializers.StringRelatedField(many=True, read_only=True)
    course_home_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = CourseDetail
        fields = [
            'verbose_name', 'course', 'short_description', 'course_home_count',
            'full_description', 'benefits', 'skills'
        ]


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    course_detail = CourseDetailSerializer(many=False, read_only=True)
    program = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    level = serializers.CharField(source='get_level_display')
    tags = serializers.StringRelatedField(many=True, read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    ability_test = serializers.PrimaryKeyRelatedField(read_only=True)
    c_homes = CourseHomeShowSerializer(many=True, read_only=True)
    is_my_course = serializers.SerializerMethodField()
    # views = serializers.StringRelatedField(many=True, required=False)
    view_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'icon', 'slug', 'level', 'outline_detail', 'outline_file',
            'fee_type', 'status', 'course_detail', 'program', 'view_count',
            'field', 'tags', 'ability_test', 'created_date',
            'updated_date', 'created_by', 'c_homes', 'is_my_course', 'price'
        ]
        read_only_fields = ('created_date', 'updated_date', 'created_by')

    def get_is_my_course(self, obj):
        user = self.context.get('user')
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False

    @staticmethod
    def get_view_count(obj):
        return obj.views.count()


class CourseSearchSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    level = serializers.CharField(source='get_level_display')
    course_home_count = serializers.IntegerField(read_only=True)
    course_teachers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    view_count = serializers.SerializerMethodField(read_only=True)
    bought_date = serializers.SerializerMethodField(read_only=True)
    is_my_course = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title',  'fee_type', 'price', 'is_my_course',
            'icon', 'slug', 'level', 'status', 'view_count',
            'field', 'course_home_count', 'course_teachers', 'bought_date'
        ]

    def get_bought_date(self, obj):
        user = self.context.get('user')
        if user is not None:
            try:
                instance = UserBuyCourse.objects.get(user_id=user.id, course_id=obj.id)
            except UserBuyCourse.DoesNotExist:
                return None
            return instance.bought_date
        return None

    def get_is_my_course(self, obj):
        request = self.context.get('request', None)
        user_ctx = None
        if request is not None:
            user_ctx = request.user
        user = self.context.get('user', user_ctx)
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False

    @staticmethod
    def get_view_count(obj):
        return UserViewCourse.objects.filter(course_id=obj.id).count()


class CourseMySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)
    level = serializers.CharField(source='get_level_display')
    course_home_count = serializers.IntegerField(read_only=True)
    course_teachers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    bought_date = serializers.SerializerMethodField(read_only=True)
    my_course_homes = serializers.SerializerMethodField(read_only=True)
    view_count = serializers.SerializerMethodField(read_only=True)
    c_homes = CourseHomeShowSerializer(many=True, required=False)
    is_my_course = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'fee_type', 'price', 'view_count', 'is_my_course',
            'icon', 'slug', 'level', 'status', 'field', 'c_homes',
            'course_home_count', 'course_teachers', 'bought_date', 'my_course_homes'
        ]

    @staticmethod
    def get_view_count(obj):
        return UserViewCourse.objects.filter(course_id=obj.id).count()

    def get_is_my_course(self, obj):
        request = self.context.get('request')
        user = self.context.get('user', request.user)
        if user:
            return obj.user_buy.filter(pk=user.id).count() > 0
        else:
            return False

    def get_my_course_homes(self, obj):
        request = self.context.get('request')
        user = self.context.get('user', request.user)
        if user is not None:
            queryset = obj.c_homes.filter(students__in=[user])
            return CourseHomeShowSerializer(instance=queryset, many=True).data
        return None

    def get_bought_date(self, obj):
        user = self.context.get('user')
        if user is not None:
            try:
                instance = UserBuyCourse.objects.get(user_id=user.id, course_id=obj.id)
            except UserBuyCourse.DoesNotExist:
                return None
            return instance.bought_date
        return None


class CourseProcessSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    level = serializers.CharField(source='get_level_display')
    bought_date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'icon', 'slug', 'level', 'status',
            'field', 'course_home_count', 'bought_date'
        ]

    def get_bought_date(self, obj):
        user = self.context.get('user')
        if user is not None:
            try:
                instance = UserBuyCourse.objects.get(user_id=user.id, course_id=obj.id)
            except UserBuyCourse.DoesNotExist:
                return None
            return instance.bought_date
        return None


class CourseDataSerializer(serializers.ModelSerializer):
    view_count = serializers.SerializerMethodField(read_only=True)
    field = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'created_date', 'view_count',
                  'fee_type', 'price', 'level', 'field']

    @staticmethod
    def get_view_count(obj):
        return UserViewCourse.objects.filter(course_id=obj.id).count()


class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name']