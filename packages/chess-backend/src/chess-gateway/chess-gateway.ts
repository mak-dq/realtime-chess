import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChessGameService } from '../chess-game/chess-game.service';
import { Request } from '@nestjs/common';

@WebSocketGateway({port:3000})
export class ChessGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chessGameService:ChessGameService){}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(client: Socket, data: any, @Request() req) {
    // Handle join game request
    this.chessGameService.handleJoinGame(data,req.user.id)
  }

  @SubscribeMessage('move')
  handleMove(client:Socket, data:any){
    // Handle move request
  }

  @SubscribeMessage('resign')
  handleResign(client: Socket, data: any) {
    // Handle resign request
  }

  @SubscribeMessage('drawOffer')
  handleDrawOffer(client: Socket, data: any) {
    // Handle draw offer request
  }

  @SubscribeMessage('chat')
  handleChat(client: Socket, data: any) {
    //Handle chat request
  }
}
