from django.urls import path, include

urlpatterns = [
    path('auth/', include('users.urls')),
    path('role', include('roles.urls')),
    path('profile/', include('profiles.urls'))
]
