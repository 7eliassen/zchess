from django.urls import path
from .views import *
urlpatterns = [
    path('profile/<str:username>/', ProfileView.as_view(), name='get profile'),
    path('user/', CreateUser.as_view(), name='create user'),
    path('game/<uuid:id>/', GameView.as_view(), name='get game info'),
    path('test/', ExampleView.as_view())
]
