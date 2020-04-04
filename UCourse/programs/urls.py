from django.urls import path
from .views import FieldDetailAPI, FieldListAPI

urlpatterns = [
    path('/', FieldListAPI.as_view(), name="field-list"),
    path('/<str:slug>', FieldDetailAPI.as_view(), name="field-detail")
]