from django.urls import path, include
from .views import SearchAPI

urlpatterns = [
    path('auth/', include('users.urls')),
    path('role', include('roles.urls')),
    path('profile/', include('profiles.urls')),
    path('courses/', include('courses.urls')),
    path('tags/', include('tags.urls')),
    path('search/', SearchAPI.as_view())
]
