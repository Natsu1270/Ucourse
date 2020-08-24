from django.urls import path
from .views import GetAllAPI, GetAllMyAPI

urlpatterns = [
    path('', GetAllAPI.as_view()),
    path('/my', GetAllMyAPI.as_view()),
]