from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from .models import Account
from .permissions import IsAccountOwner
from .serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(), )

        if self.request.method == 'POST':
            return (permissions.AllowAny(), )

        return (permissions.IsAuthenticated(), IsAccountOwner(), )

    def create(self, request):
        print request.data
        serializer = self.serializer_class(data=request.data)
        print serializer.is_valid()
        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(
                serializer.validated_data, status=status.HTTP_201_CREATED
            )

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
