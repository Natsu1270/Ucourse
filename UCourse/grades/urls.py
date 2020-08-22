from django.urls import path
from . import views

urlpatterns = [
    path('student_grades', views.GetStudentGradesAPI.as_view())
]
