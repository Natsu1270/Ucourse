from django.urls import path

from . import views

app_name = 'course_homes'

urlpatterns = [
    path('register', views.RegisterCourseAPI.as_view(), name='student_register'),
    path('my', views.UserCourseHomeListAPI.as_view(), name='user_course_home_list')
]
