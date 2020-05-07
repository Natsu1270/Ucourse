from django.urls import path
from exams import views

app_name = 'exams'
urlpatterns = [
    path('<int:pk>', views.ExamDetailAPI.as_view(), name='exam_detail'),
    path('student_exams', views.StudentExamPrivateListAPI.as_view(), name='student_exam_detail'),
]