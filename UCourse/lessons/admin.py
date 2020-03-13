from django.contrib import admin
from .models import Lesson


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "code",
    )
    list_filter = ("status",)
    readonly_fields = ("created_date", "created_by", "created_by_name", "modified_date")
    search_fields = ("name", "code")


