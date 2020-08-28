from django.urls import path
from . import views

urlpatterns = [
    path('students', views.GetListSummary.as_view()),

]