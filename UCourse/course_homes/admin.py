from django.contrib import admin
from .models import CourseHome, LearningTopic, TopicAsset, Assignment

admin.site.register(CourseHome)
admin.site.register(LearningTopic)
admin.site.register(TopicAsset)
admin.site.register(Assignment)
