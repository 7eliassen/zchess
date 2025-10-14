import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zchess.settings')

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chessapp.routing

chessapp = ProtocolTypeRouter({
    "http": get_asgi_application(),  # DRF and normal Django views
    "websocket": AuthMiddlewareStack(
            URLRouter(
                chessapp.routing.websocket_urlpatterns
            )
    ),
})
