from django.urls import path, include
from knox import views as knox_views

from . import views

urlpatterns = [
    path('', include('knox.urls')),
    path('register', views.RegisterAPI.as_view()),
    path('login',views.LoginAPI.as_view(), name='login'),
    path('logout', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('user',views.UserAPI.as_view(), name='user'),
]
