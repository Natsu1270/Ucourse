from django.urls import path
from .views import ProgramListAPI, ProgramDetailAPI, BuyProgramAPI, BuyProgramSuccessAPI

urlpatterns = [
    path('', ProgramListAPI.as_view(), name="program-list"),
    path('<str:slug>', ProgramDetailAPI.as_view(), name="program-detail"),
    path('user/buy', BuyProgramAPI.as_view()),
    path('user/buy/success', BuyProgramSuccessAPI.as_view())
]