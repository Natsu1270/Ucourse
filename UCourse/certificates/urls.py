from django.urls import path
from . import views

urlpatterns = [
    path('', views.GenerateCertificate.as_view()),
]