from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import BasePermission

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsAdminOrIsAuthenticatedReadOnly(BasePermission):
    def has_permission(self, request, view):
        if (
                (request.method in SAFE_METHODS and
                 not isinstance(request.user, AnonymousUser) and
                 request.user.is_authenticated) or
                (not isinstance(request.user, AnonymousUser) and
                 request.user.is_authenticated and
                 request.user.is_admin)
        ):
            return True
        return False


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if (
                request.method in SAFE_METHODS or
                (not isinstance(request.user, AnonymousUser) and
                 request.user.is_authenticated and
                 request.user.is_admin)
        ):
            return True
        return False
