from django.urls import path, include
from rest_framework.routers import DefaultRouter
from courses import views

app_name = 'courses'
urlpatterns = [
    path('', views.CourseListView.as_view(), name='course-list'),
    path('<int:pk>', views.CourseDetailView.as_view(), name='course-detail'),
]