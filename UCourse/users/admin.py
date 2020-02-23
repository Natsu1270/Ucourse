from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from . import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'username']
    list_filter = ['is_student', 'is_teacher']
    search_fields = ['username', 'email']
    readonly_fields = ('date_joined', 'last_login',)
    fieldsets = (
        (None, {
            "fields": (
                'username', 'email', 'password', 'is_teacher', 'is_student', 'is_staff', 'is_superuser', 'date_joined', 'last_login'
            ),
        }),
    )


admin.site.register(models.User, UserAdmin)
