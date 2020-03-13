from rest_framework import viewsets, permissions
from .models import Role
from .serializers import RoleSerializer


class RoleViewSet(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
    permission_classes = [permissions.IsAdminUser]
