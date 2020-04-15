from rest_framework import permissions
from . import constants


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True
        return obj.user == request.user


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsTeacherOrTARoleOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role.code == constants.TEACHER_ROLE_CODE or
            request.user.role.code == constants.TA_ROLE_CODE or
            request.user.is_superuser
        )

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role.code == constants.TEACHER_ROLE_CODE or
            request.user.role.code == constants.TA_ROLE_CODE or
            request.user.is_superuser
        )


