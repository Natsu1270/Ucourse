from django.contrib import admin
from .models import Exam, AbilityTest, UserAbilityTest, UserResponse


class UserTakenInline(admin.TabularInline):
    model = AbilityTest.taken_users.through


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'exam_type')
    list_filter = ('status', 'exam_type',)
    readonly_fields = ('created_date', 'created_by', 'created_by_name', 'modified_by', 'modified_by_name')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(AbilityTest)
class AbilityTestAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'course')
    list_filter = ('status', 'course')
    readonly_fields = ('created_date', 'created_by')
    inlines = [UserTakenInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


admin.site.register(UserAbilityTest)
admin.site.register(UserResponse)