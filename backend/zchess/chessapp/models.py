from django.db import models
from django.contrib.auth.models import User

"""
Tables:
First:
    User - default django database
        at start only username and password fields are neccesary
    Profile - separeted from Users because Users shouldn't be overcomplicated
        user_id
        wins, loses, draws, elo,
        settings? - may contains in localstorage 
    Game - keeps info about games
        winner, pgn(game history) 
Optimal:
    Message?
    Friends?
"""

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    elo = models.IntegerField(default=1200)

    def __str__(self):
        return f"{self.user.username} profile"


class Game(models.Model):
    pgn = models.TextField()
    white = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='games_as_white')
    black = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='games_as_black')
    WINNER_CHOICES = [
        ('white', 'White'),
        ('black', 'Black'),
        ('draw', 'Draw'),
    ]
    winner = models.CharField(max_length=5, choices=WINNER_CHOICES)

    def __str__(self):
        return f"Game {self.white} vs {self.black} ({self.winner})"