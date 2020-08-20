from django.urls import path
from . import views

urlpatterns = [

    path('', views.AssigmentListAPI.as_view()),
    path('<int:pk>', views.AssignmentDetailAPI.as_view()),
    path('student', views.StudentAssignmentAPI.as_view()),
    path('student/submit', views.SubmitAssignmentAPI.as_view()),
    path('student/list_by_topic', views.StudentAssignmentListByTopic.as_view()),
    path('student/download_item', views.DownloadAssignmentItem.as_view()),
    path('student/download_all', views.DownloadAssignmentAll.as_view()),
]
