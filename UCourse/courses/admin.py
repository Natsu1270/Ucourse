from django.contrib import admin

from course_homes.models import CourseHome
from .models import Course, CourseDetail, Skill, UserBuyCourse


class CourseHomeInline(admin.StackedInline):
    model = CourseHome


class CourseAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'level', 'status')
    list_filter = ('level', 'status')
    list_display_links = ('__str__',)
    search_fields = ('title',)
    ordering = ('id',)
    readonly_fields = ('created_by', 'created_by_name', 'created_date', 'updated_date')
    # inlines = [CourseHomeInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


admin.site.register(Course, CourseAdmin)
admin.site.register(CourseDetail)
admin.site.register(Skill)
admin.site.register(UserBuyCourse)

