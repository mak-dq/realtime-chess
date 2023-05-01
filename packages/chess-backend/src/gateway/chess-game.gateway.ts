import {
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChessGameService } from '../chess-game/services/chess-game.service';
import { CreateGameDto } from '../chess-game/dtos/createGame.dto';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  port: 3000,
  cors: {
    origin: '*',
  },
})
export class ChessGameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  users = 0;

  constructor(
    @Inject(forwardRef(() => ChessGameService))
    private chessGameService: ChessGameService
  ) {}

  afterInit() {
    this.server.on('connection', (socket) => {
      console.log('Socket ID: ', socket.id);
      console.log('connected');
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.users++;
    this.server.emit('users', this.users);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('join')
  handleJoinGame(client: Socket, data: CreateGameDto) {
    console.log('data', data);
    client.broadcast.emit('join', data);
  }


  // send `${color+type}` in the move object
  @SubscribeMessage('move')
  handleMove(client: Socket, data: any) {
    const wsRes = this.chessGameService.saveMoves(data);
    client.broadcast.emit('move', wsRes);
  }

  @SubscribeMessage('replay')
  handleReplay(client: Socket, data: any) {
    const wsRes = this.chessGameService.replayMoves(data);
    client.broadcast.emit('replay', wsRes);
  }

  @SubscribeMessage('chat')
  handleChat(client: Socket, message: any) {
    client.broadcast.emit('chat', message);
  }

  @SubscribeMessage('drawOffer')
  handleDrawOffer(client: Socket, data: any) {
    // Handle draw offer request
    const wsRes = this.chessGameService.draw(data);
    client.broadcast.emit('drawOffer', wsRes);
  }

  @SubscribeMessage('resign')
  handleResign(client: Socket, data: any) {
    // Handle resign request
    const wsRes = this.chessGameService.resign(data);
    client.broadcast.emit('resign', wsRes);
  }
}
