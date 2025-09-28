from rest_framework import serializers
from chessapp.models import Game, Profile, User

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['pgn', 'white', 'black', 'winner']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'wins', 'losses', 'draws', 'elo']