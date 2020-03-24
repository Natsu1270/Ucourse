from django.urls import path, include
from . import views

app_name = 'tags'

urlpatterns = [
    path('keywords', views.SearchKeyWordAPI.as_view(), name='keywords'),
]