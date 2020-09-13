from django.urls import path
from .views import GetAllAPI, GetAllMyAPI, GetAllBoughtAndRegister, GetProgramProcess, GetMyCourses, SearchRegisterCourses, GetTransactionHistory, GetTotalMaterialCount

urlpatterns = [
    path('', GetAllAPI.as_view()),
    path('my', GetAllMyAPI.as_view()),
    path('my-all', GetAllBoughtAndRegister.as_view()),
    path('program-process', GetProgramProcess.as_view()),
    path('courses', GetMyCourses.as_view()),
    path('search', SearchRegisterCourses.as_view()),
    path('transaction-history', GetTransactionHistory.as_view()),
    path('total-material', GetTotalMaterialCount.as_view())

]
