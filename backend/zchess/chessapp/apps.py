from django.apps import AppConfig


class ChessappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chessapp'

    def ready(self):
        import chessapp.signals
