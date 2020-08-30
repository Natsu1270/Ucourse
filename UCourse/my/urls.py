from django.urls import path
from .views import GetAllAPI, GetAllMyAPI, GetAllBoughtAndRegister, GetProgramProcess

urlpatterns = [
    path('', GetAllAPI.as_view()),
    path('my', GetAllMyAPI.as_view()),
    path('my-all', GetAllBoughtAndRegister.as_view()),
    path('program-process', GetProgramProcess.as_view())
]
