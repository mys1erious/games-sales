from rest_framework.permissions import BasePermission

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsAdminOrIsAuthenticatedReadOnly(BasePermission):
    def has_permission(self, request, view):
        if (request.methhod in SAFE_METHODS and
            request.user and request.user.authenticated or
            request.user and request.user.authenticated and request.user.is_admin
        ):
            return True
        return False


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if (request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and request.user.is_admin
        ):
            return True
        return False
