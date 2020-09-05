from django.urls import path
from . import views

urlpatterns = [
    path('generate', views.GenerateCertificate.as_view()),
    path('handout', views.HandoutCertificate.as_view()),
    path('student', views.GetStudentCertificate.as_view()),
    path('program/request', views.RequestProgramCertificate.as_view()),
    path('all', views.GetAllCourseCertificate.as_view()),
    path('all-program-cer', views.GetALLProgramCertificate.as_view())
]
