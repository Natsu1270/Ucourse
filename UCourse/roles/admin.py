from django.contrib import admin
from .models import Role


class RoleAdmin(admin.ModelAdmin):
    fields = ['code','name','created_date']
    list_display = ['code', 'name' , 'id']
    ordering = ['id']
    list_filter = ['id','code']
    readonly_fields = ['created_date']

admin.site.register(Role, RoleAdmin)
