from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'title', 'content')
    search_fields = ['title',]
  
admin.site.register(Event, EventAdmin)
