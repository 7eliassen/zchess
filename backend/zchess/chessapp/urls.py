from django.urls import path
from .views import *
from .views_auth import *

urlpatterns = [
    path('profile/<str:username>/', ProfileView.as_view(), name='get profile'),
    path('user/', CreateUser.as_view(), name='create user'),
    path('game/<uuid:id>/', GameView.as_view(), name='get game info'),
    path('test/', ExampleView.as_view()),
    path('login/', LoginView.as_view(), name="Login"),
    path('checklogin/', UserView.as_view(), name="check is user log in"),
    path('csrf/', CSRFTokenView.as_view(), name='csrf'),
]
