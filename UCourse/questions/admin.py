from django.contrib import admin
from .models import Question, QuestionKit, Choice


class QuestionInline(admin.TabularInline):
    model = Question.question_kits.through


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code')
    list_filter = ('status', 'question_type', 'difficult_level')
    readonly_fields = ('created_date', 'created_by')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(QuestionKit)
class QuestionKitAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'code', 'skill')
    list_filter = ('status', 'skill')
    readonly_fields = ('created_date', 'created_by', 'modified_by', 'modified_date')
    inlines = [QuestionInline]

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.set_created_by(request.user)
        super().save_model(request, obj, form, change)


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'get_short_content')

    def get_short_content(self, obj):
        if len(obj.content) > 50:
            return obj.content[:50]
        else:
            return obj.content
    get_short_content.short_description = 'Short Content'
