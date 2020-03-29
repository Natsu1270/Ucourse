from django.contrib import admin
from .models import Tag, SearchKeyWord


class TagAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code')
    list_display_links = ('__str__', 'code')
    search_fields = ('name', 'code')
    ordering = ('name', 'code')
    readonly_fields = ('created_by', 'created_date')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


admin.site.register(Tag, TagAdmin)
admin.site.register(SearchKeyWord)