from django.contrib import admin
from .models import Forum, Thread, ThreadResponse


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'course_home', 'status')
    list_filter = ('status', 'course_home')
    readonly_fields = ('created_date', 'created_by')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(Thread)
class ThreadAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'forum', 'status')
    list_filter = ('status', 'forum')
    readonly_fields = ('created_date', 'created_by')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(ThreadResponse)
class ThreadResponseAdmin(admin.ModelAdmin):
    readonly_fields = ('timestamp', 'created_by')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)