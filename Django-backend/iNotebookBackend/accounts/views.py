from accounts.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from utils.auth_token import get_user_token
from accounts.serializers import *
# from rest_framework.authtoken import RefreshToken
from django.contrib.auth import authenticate


class UserViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    def list(self, request):
        logged_in_user = request.user
        if logged_in_user.is_superuser:
            user = User.objects.all()
            serializer = UserSerializerData(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else :
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['POST'], name='Signup')
    def signup(self, request):
        try:
            user_data = request.data
            serializer = UserSerializerData(data=user_data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            token = get_user_token(serializer.instance)
            return Response({'token': token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['POST'], name='Login')
    def login(self, request):
        try:
            user_data = request.data
            serializer = LoginSerializer(data=user_data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)

            if user is None or not user.is_active:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

            token = get_user_token(user)
            access_token = str(token)
            return Response({'token': access_token}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
