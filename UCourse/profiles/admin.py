from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['get_email', 'fullname']
    search_fields = ['get_email', 'fullname', 'phone_number', 'address']
    list_filter = ['gender', 'is_teacher', 'is_student']

    def get_email(self, obj):
        return obj.user.email


admin.site.register(Profile, ProfileAdmin)
