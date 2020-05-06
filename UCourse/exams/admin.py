from django.contrib import admin
from .models import Exam, StudentExam, AbilityTest, UserAbilityTest, UserResponse


class UserTakenInline(admin.TabularInline):
    model = AbilityTest.taken_users.through


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'exam_type')
    list_filter = ('status', 'exam_type',)
    readonly_fields = ('created_date', 'created_by', 'modified_by')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(StudentExam)
class StudentExamAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'date_taken', 'result')
    readonly_fields = ('date_taken',)
    ordering = ('date_taken', )


@admin.register(AbilityTest)
class AbilityTestAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'course')
    list_filter = ('status', 'course')
    readonly_fields = ('created_date', 'created_by')
    # inlines = [UserTakenInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(UserAbilityTest)
class UserAbilityTestAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'date_taken', 'result')
    readonly_fields = ('date_taken', 'user_responses')
    ordering = ('date_taken', )


admin.site.register(UserResponse)