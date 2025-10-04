from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Profile, User, Game
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import ProfileSerializer, UserSerializer, GameSerializer
from rest_framework.response import Response
from rest_framework import status

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