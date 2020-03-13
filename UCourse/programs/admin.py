from django.contrib import admin
from .models import Program


class ProgramAdmin(admin.ModelAdmin):
    list_display = ("__str__", "code")
    list_filter = ("status",)
    search_fields = ("name", "code")
    readonly_fields = ("created_by", "created_date", "created_by_name", "modified_date")


admin.site.register(Program, ProgramAdmin)
