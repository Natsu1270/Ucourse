from django.conf.urls.static import static
from django.urls import path, include

from ucourse import settings
from .views import SearchAPI, AdvancedSearch

urlpatterns = [
    path('auth/', include('users.urls')),
    path('role', include('roles.urls')),
    path('profile/', include('profiles.urls')),
    path('courses/', include('courses.urls')),
    path('tags/', include('tags.urls')),
    path('search/', SearchAPI.as_view()),
    path('search/advanced', AdvancedSearch.as_view()),
    path('field/', include('programs.field_urls')),
    path('programs/', include('programs.urls')),
    path('exams/', include('exams.urls')),
    path('ability-tests/', include('exams.at_urls')),
    path('course-home/', include('course_homes.urls')),
    path('all/', include('my.urls')),
    path('forums/', include('forums.urls')),
    path('questions/', include('questions.urls')),
    path('assignment/', include('assignment.urls')),
    path('grade/', include('grades.urls')),
    path('events/', include('events.urls')),
    path('certificate/', include('certificates.urls')),
    path('summary/', include('summary.urls')),
    path('admin/', include('admin.urls')),
    path('notification/', include('notifications.urls'))

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
