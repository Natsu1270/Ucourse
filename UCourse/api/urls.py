from django.urls import path, include
from .views import SearchAPI

urlpatterns = [
    path('auth/', include('users.urls')),
    path('role', include('roles.urls')),
    path('profile/', include('profiles.urls')),
    path('courses/', include('courses.urls')),
    path('tags/', include('tags.urls')),
    path('search/', SearchAPI.as_view()),
    path('field/', include('programs.field_urls')),
    path('programs/', include('programs.urls')),
    path('exams/', include('exams.urls')),
    path('ability-tests/', include('exams.at_urls')),
    path('course-home/', include('course_homes.urls')),
]
