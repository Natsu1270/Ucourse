from django.contrib import admin
from .models import Program, Field


class ProgramAdmin(admin.ModelAdmin):
    list_display = ("__str__", "code")
    list_filter = ("status",)
    search_fields = ("name", "code")
    readonly_fields = ("created_by", "created_date", "created_by_name", "modified_date")

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


admin.site.register(Program, ProgramAdmin)
admin.site.register(Field)