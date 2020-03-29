from django.contrib import admin
from .models import Course, CourseDetail


class CourseAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'level', 'status')
    list_filter = ('level', 'status')
    list_display_links = ('__str__', 'code')
    search_fields = ('title', 'code')
    ordering = ('id',)
    readonly_fields = ('created_by', 'created_by_name', 'created_date', 'updated_date')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


admin.site.register(Course, CourseAdmin)
admin.site.register(CourseDetail)

