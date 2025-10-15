from django.urls import re_path, path
from . import consumers

websocket_urlpatterns = [
    path('ws/startgame/', consumers.StartGame.as_asgi()),
    path('ws/playgame/<uuid:room_id>', consumers.PlayGame.as_asgi()),
]
