from django.urls import path
from exams import views

app_name = 'exams'
urlpatterns = [
    path('list', views.AbilityTestListAPI.as_view(), name='ability-test-list'),
    path('<int:pk>', views.AbilityTestDetailAPI.as_view(), name='ability_test_detail'),
    path('users/list', views.UserAbilityTestListAPI.as_view(), name='user-at-list'),
    path('users/<int:pk>', views.UserAbilityTestDetailAPI.as_view(), name='user-at-detail'),
    path('create', views.GenerateUserAbilityTestAPI.as_view())
]