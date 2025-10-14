from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Profile, User, Game
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import ProfileSerializer, UserSerializer, GameSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication



@extend_schema(
    tags=["DEBUG"],
    responses={
        200: OpenApiResponse(description="Returns username of the logged-in user"),
        401: OpenApiResponse(description="Not authenticated"),
    }
)
class Hello(APIView):
    def get(self, request):
        content = {'message': f'Hello, {request.user.username}!'}
        return Response(content)


@extend_schema(
    tags=["Profiles"], 
    responses={
        200: ProfileSerializer,
        404: OpenApiResponse(description="User doesn't exist"),
}
)
class ProfileView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    # FIXME!!!: DOESN'T WORKS. NEED TO USE .user_create(). Yet it uses just .create()
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
    permission_classes = [AllowAny]
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field='id'