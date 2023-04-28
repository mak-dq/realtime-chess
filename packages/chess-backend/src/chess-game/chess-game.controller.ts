import { Controller, Post, Request } from '@nestjs/common';
import { ChessGameService } from './chess-game.service';

@Controller('chess-game')
export class ChessGameController {
  constructor(
    private readonly chessGameService: ChessGameService,
  ) {}

  @Post('/join')
  joinLobby(@Request() req) {
    return this.chessGameService.joinLobby(req.user.id);
  }
}
