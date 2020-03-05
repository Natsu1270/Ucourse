from django.urls import path, include
from . import views

urlpatterns = [
    path('list', views.ProfileListAPI.as_view()),
    path('<int:pk>', views.RUDProfileAPI.as_view()),
    path('create', views.CreateProfileAPI.as_view()),
]