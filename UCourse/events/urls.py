from django.urls import path, include
from . import views

urlpatterns = [
    path('list', views.EventAPI.as_view()),
    path('<int:id>', views.EventDetailAPI.as_view()),
    # path('teachers', views.TeacherListAPI.as_view(), name='teacher-list')
]