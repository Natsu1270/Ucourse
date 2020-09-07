from django.urls import path
from exams import views

app_name = 'exams'
urlpatterns = [
    path('<int:pk>', views.ExamDetailAPI.as_view(), name='exam_detail'),
    path('student_exams', views.StudentExamPrivateListAPI.as_view(), name='student_exam_detail'),
    path('student_exams/<int:pk>', views.ReviewStudentExam.as_view()),
    path('student_exam_result_detail', views.GetStudentExamResultDetail.as_view()),
    path('init', views.InitExamAPI.as_view()),
    path('submit/<int:pk>', views.SubmitExamAPI.as_view()),
    path('create', views.CreateExamAPI.as_view())
]