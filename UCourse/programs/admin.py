from django.contrib import admin
from .models import Program, Field, UserBuyProgram
from courses.models import Course


class CourseInline(admin.TabularInline):
    model = Course.program.through


class ProgramAdmin(admin.ModelAdmin):
    list_display = ("__str__", )
    list_filter = ("status",)
    search_fields = ("name",)
    readonly_fields = ("created_by", "created_date", "created_by_name", "modified_date")
    inlines = [CourseInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


class FieldAdmin(admin.ModelAdmin):
    list_display = ("__str__", )
    search_fields = ("name", )
    readonly_fields = ("created_date", "slug")


admin.site.register(Program, ProgramAdmin)
admin.site.register(Field, FieldAdmin)
admin.site.register(UserBuyProgram)