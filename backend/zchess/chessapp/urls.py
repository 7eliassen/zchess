from django.urls import path
from .views import *

urlpatterns = [
    path('profile/<str:username>/', ProfileView.as_view(), name='get-profile'),
]