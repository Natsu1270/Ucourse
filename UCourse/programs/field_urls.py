from django.urls import path
from .views import FieldDetailAPI, FieldListAPI, FieldListMinAPI

urlpatterns = [
    path('', FieldListMinAPI.as_view(), name="field-list"),
    path('all', FieldListAPI.as_view(), name="field-all"),
    path('<str:slug>', FieldDetailAPI.as_view(), name="field-detail")
]