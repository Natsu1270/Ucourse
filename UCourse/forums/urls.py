from django.urls import path, include
from . import views

app_name = 'forums'
urlpatterns = [
    path('', views.ForumListAPI.as_view(), name='forum_list'),
    path('<int:pk>', views.ForumDetailAPI.as_view(), name='forum_detail'),
    path('threads', views.ThreadListAPI.as_view(), name='thread_list'),
    path('threads/<int:pk>', views.ThreadDetailAPI.as_view(), name='thread_detail'),
    path('responses', views.ThreadResponseListAPI.as_view()),
    path('responses/<int:pk>', views.ThreadResponseDetailAPI.as_view())
]