from django.urls import path
from questions import views

app_name = 'questions'
urlpatterns = [
    path('<int:pk>', views.QuestionDetailAPI.as_view(), name='question_detail'),
    # path('student_exams', views.StudentExamPrivateListAPI.as_view(), name='student_exam_detail'),
    # path('submit', views.SubmitExamAPI.as_view()),
    path('create', views.CreateQuestionAPI.as_view()),
    path('edit', views.EditQuestionAPI.as_view()),
    path('questions-by-teacher', views.GetQuestionsByTeacher.as_view()),
    path('questions-teacher-remain', views.GetQuestionsByTeacherRemain.as_view()),
    path('add-to-exam', views.AddToExam.as_view())

]