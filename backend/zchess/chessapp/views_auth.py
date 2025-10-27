from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.permissions import AllowAny
@extend_schema(
    summary="User login",
    description="Authenticate user using username and password. Returns session cookie on success.",
    request={
        "application/json": {
            "example": {
                "username": "testuser",
                "password": "secret123"
            }
        }
    },
    responses={
        200: OpenApiResponse(description="login succesfull"),
        400: OpenApiResponse(description="something wrong")
    },
)
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Logged in successfully"})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out"})


class UserView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "username": request.user.username,
            })
        return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
