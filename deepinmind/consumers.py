from channels.generic.websocket import WebsocketConsumer

class GameConsumer(WebsocketConsumer):
    async def connect(self):
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'chat_' + self.game_name
        
        # Rejoindre le groupe de partie
        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):
        # Enlève du groupe de la partie
        await self.channel_layer.group_discard(
            self.game_group_name,
            self.channel_name
        )
