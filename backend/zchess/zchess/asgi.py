import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.sessions import SessionMiddlewareStack
import chessapp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zchess.settings')

chessapp = ProtocolTypeRouter({
    "http": get_asgi_application(),  # DRF and normal Django views
    "websocket": SessionMiddlewareStack(
        AuthMiddlewareStack(
            URLRouter(
                chessapp.routing.websocket_urlpatterns
            )
        )
    ),
})
