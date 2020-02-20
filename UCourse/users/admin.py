from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from . import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email']
    fieldsets = (
        (None, {
            "fields": (
                'email', 'password'
            ),
        }),
    )


admin.site.register(models.User)
