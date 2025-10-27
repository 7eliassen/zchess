from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics # type: ignore
from .models import Profile, User, Game
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import ProfileSerializer, UserSerializer, GameSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
@extend_schema(
    tags=['debug'],
    responses={
        200: OpenApiResponse(description="debug for auth"),
        401: OpenApiResponse(description="not authorizated")
    }
)
class ExampleView(APIView):
    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
        }
        return Response(content)


@extend_schema(
    tags=["Profiles"], 
    responses={
        200: ProfileSerializer,
        404: OpenApiResponse(description="User doesn't exist"),
}
)
class ProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'user__username'
    lookup_url_kwarg = 'username'


@extend_schema(
tags=["Users"],
responses={
    201: OpenApiResponse(description="User created successfully"),
    400: OpenApiResponse(description="A user with that username already exists.")
    }
)
class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)

@extend_schema(
tags=["Games"],
responses={
    200: GameSerializer,
    404: OpenApiResponse(description="Game doesn't exist")
    }
)
class GameView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field='id'


class CSRFTokenView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({'csrfToken': get_token(request)})