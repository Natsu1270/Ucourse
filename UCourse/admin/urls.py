from django.urls import path
from . import views

urlpatterns = [
    path('data/user', views.GetAdminUserData.as_view()),
    path('data/program-course', views.GetAdminProgramCourseData.as_view()),
    path('data/income', views.GetAdminIncomeData.as_view())
]