# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .redis_client import redis_client as redis
from channels.layers import get_channel_layer
from uuid import uuid4

class PlayGame(AsyncWebsocketConsumer):
    async def connect(self):
        room_id = self.scope['url_route']['kwargs']['room_id']
        user = str(self.scope["user"])
        room = await redis.hgetall(f"game:{room_id}")
        if user == room['black']:
            await redis.hset(f"game:{room_id}", "is_black_connected", 1)
            await self.accept()
        elif user == room['white']:
            await redis.hset(f"game:{room_id}", "is_white_connected", 1)
            await self.accept()
        else:
            await self.close()
        
    async def disconnect(self, code):
        user = str(self.scope["user"])
        room_id = self.scope['url_route']['kwargs']['room_id']
        room = await redis.hgetall(f"game:{room_id}")

        if user == room['black']:
            await redis.hset(f"game:{room_id}", "is_black_connected", 0)
        elif user == room['white']:
            await redis.hset(f"game:{room_id}", "is_white_connected", 0)

    async def receive(self, text_data = None, bytes_data = None):
        ...

class StartGame(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_authenticated:
            await self.accept()
            opponent_data = await redis.rpop("game_queue")
            if opponent_data:
                opponent_data = json.loads(opponent_data)
                opponent_socket = opponent_data['channel']
                opponent_username = opponent_data['username']
                room = str(uuid4())
                await redis.hset(f"game:{room}", mapping={
                    'black': opponent_username,
                    'is_black_connected': 0,
                    'white': str(user),
                    'is_white_connected': 0,
                    'state': 'waiting',
                    'pgn': '...',
                })
                await self.send(json.dumps({"status":"ready", "room": room}))
                channel_layer = get_channel_layer()
                await channel_layer.send(
                opponent_socket,
                    {
                        "type": "game.ready",
                        "room": room,
                    }
                )
            else:
                await redis.lpush("game_queue", json.dumps({"username": str(user), "channel": self.channel_name}))
                await self.send(json.dumps({"status": "waiting"}))
        else:
            await self.close()
    async def receive(self, text_data = None, bytes_data = None):
        ...

    async def game_ready(self, event):
        room = event["room"]

        await self.send(json.dumps({"status": "ready", "room":room}))

    async def disconnect(self, code):
        ...
        # user_id = self.scope["user"].id
        # await redis.lrem("game_queue", 0, user_id)
        # print(f"{user_id} dissconnect")