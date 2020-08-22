from django.urls import path
from . import views

urlpatterns = [
    path('student_grades', views.GetStudentGradesAPI.as_view()),
    path('all_grades', views.GetAllStudentGradesAPI.as_view()),
    path('assignment/update', views.UpdateStudentAssigmentGrade.as_view())
]
