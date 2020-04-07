from django.urls import path, include
from . import views

urlpatterns = [
    path('list', views.ProfileAPI.as_view()),
    path('', views.ProfileDetailAPI.as_view()),
    path('teachers', views.TeacherListAPI.as_view(), name='teacher-list')
]