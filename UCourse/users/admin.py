from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from . import models
from profiles.models import Profile


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'username']
    list_filter = ['role']
    search_fields = ['username', 'email']
    readonly_fields = ('date_joined', 'last_login',)
    fieldsets = (
        (None, {
            "fields": (
                'username', 'email', 'password', 'role', 'is_staff', 'is_superuser', 'date_joined', 'last_login'
            ),
        }),
    )


admin.site.register(models.User, UserAdmin)
