# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .redis_client import redis_client as redis
from channels.layers import get_channel_layer
from uuid import uuid4
import chess
import chess.pgn
import io
class PlayGame(AsyncWebsocketConsumer):
    

    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_id_channel_type = f"room_{self.room_id}"
        self.user = str(self.scope["user"])

        room = await self.get_room()
        if not room:
            return

        if self.user not in (room["black"], room["white"]):
            await self.close()
            return

        color = "black" if self.user == room["black"] else "white"
        await redis.hset(f"game:{self.room_id}", f"is_{color}_connected", 1)

        await self.channel_layer.group_add(self.room_id_channel_type, self.channel_name)
        await self.accept()

        
    async def disconnect(self, code):
        user = str(self.scope["user"])
        room = await self.get_room()
        if not room:
            return

        color = "black" if user == room["black"] else "white"
        await redis.hset(f"game:{self.room_id}", f"is_{color}_connected", 0)
        await self.channel_layer.group_discard(self.room_id_channel_type, self.channel_name)



    async def receive(self, text_data = None, bytes_data = None):
        handlers = {
            "move": self.handle_move,
            # "giveup": self.handle_giveup,
            # "offer_draw": self.handle_offer_draw,
        }

        data = json.loads(text_data)
        type_ = data.get("type")
        handler = handlers.get(type_)
        if handler:
            await handler(data)
        else:
            await self.send_error(type_="type_not_exists", msg=f"type <{type_}> doesn't exist")


    async def handle_move(self, data):
        move_ = data.get("move")
        
        current_room = await self.get_room()
        
        if current_room["state"] == "checkmate":
            await self.send_error(type_="incorrect_move", msg=f"Game is already finished")
            return
        
        user_color = "white" if self.user == current_room["white"] else "black"
        if user_color != current_room["turn"]:
            await self.send_error(type_="incorrect_move", msg=f"Not your turn rn")
            return

        game_pgn = chess.pgn.read_game(io.StringIO(current_room['pgn']))
        board = chess.Board()
        if game_pgn:
            for pgn_move in game_pgn.mainline_moves():
                board.push(pgn_move)
        move = chess.Move.from_uci(move_)

        if board.is_legal(move):
            board.push(move)
        else:
            await self.send_error(type_="incorrect_move", msg=f"Move <{move}> is incorrect")
            return

        game = chess.pgn.Game.from_board(board)
        game.headers.clear()

        if board.is_checkmate():
            state = "checkmate"
        elif board.is_check():
            state = "check"
        elif board.is_stalemate():
            state = "stalemate"
        else:
            state = "playing"

        
        await redis.hset(f"game:{self.room_id}", "pgn", str(game))

        if state != current_room["state"]:
            await redis.hset(f"game:{self.room_id}", "state", state)
        
        n_turn = "white" if current_room["turn"] == "black" else "black"
        await redis.hset(f"game:{self.room_id}", "turn", n_turn)

        await self.channel_layer.group_send(
            self.room_id_channel_type,
            {"type": "send_update", 
             "move": move_, 
             "player": "black" if board.turn else "white", 
             "state": state, 
             "pgn": str(game)} # I send pgn to avoid syncronization mistakes
        )

        if board.is_game_over():
            await self.channel_layer.group_send(
                self.room_id_channel_type,
                {
                    "type": "close.group"
                }
            )


    async def close_group(self, event):
        await self.close()

    async def send_update(self, event):
        await self.send(json.dumps({
            "status": "ok",
            "type": "moved",
            "state": event["state"],
            "move": event["move"],
            "player": event["player"],
            "pgn": event["pgn"]
        }))


    async def send_error(self, msg, type_="error"):
        """types of error:
        incorrect_move
        type_not_exists
        """
        await self.send(json.dumps(
            {
                "status": "error",
                "type": type_,
                "msg": msg
            }
        ))

    async def get_room(self):
        room = await redis.hgetall(f"game:{self.room_id}")
        if not room:
            await self.close(code=404)  # Room not found
            return None
        return room
    


class StartGame(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_authenticated:
            await self.accept()
            opponent_data = await redis.rpop("game_queue")
            if opponent_data:
                try:
                    opponent_data = json.loads(opponent_data)
                except Exception:
                    return
                opponent_socket = opponent_data['channel']
                opponent_username = opponent_data['username']
                
                # FIXME: a little hack?
                if opponent_username == str(user):
                    await redis.rpush("game_queue", json.dumps({"username": str(opponent_username), "channel": opponent_socket}))
                    
                else:
                    room = str(uuid4())

                    # Game's structure in REDIS 
                    await redis.hset(f"game:{room}", mapping={
                        'black': opponent_username,
                        'is_black_connected': 0,
                        'white': str(user),
                        'is_white_connected': 0,
                        'state': 'waiting',
                        'pgn': "",
                        'turn': 'white'
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
        await redis.lrem("game_queue", 0, json.dumps({"username": str(self.scope['user']), "channel": self.channel_name}))
