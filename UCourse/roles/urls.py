from rest_framework.routers import DefaultRouter
from .views import RoleViewSet

router = DefaultRouter()
router.register('', RoleViewSet)

urlpatterns = router.urls
