import json
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from .models import Account
from .permissions import IsAccountOwner
from .serializers import AccountSerializer


class LoginView(views.APIView):
    def post(self, request, format=None):
        message = ''
        data = json.loads(request.body)
        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)
                return Response(serialized.data)
            else:
                message = 'This account has been disabled'
        else:
            message = 'Username/password combination invalid'

        return Response({
            'status': 'Unauthorized',
            'message': message
        }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)


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
