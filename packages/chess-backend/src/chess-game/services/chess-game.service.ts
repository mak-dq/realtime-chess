import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChessGameGateway } from '../../gateway/chess-game.gateway';
import { CreateGameDto } from '../dtos/createGame.dto';
import { ChessGameEntity } from '../models/chess-game.entity';

@Injectable()
export class ChessGameService {
  constructor(
    @InjectRepository(ChessGameEntity)
    private readonly chessGameRepository: Repository<ChessGameEntity>,
    private readonly chessGameGateway: ChessGameGateway
  ) {}

  joinLobby(id: number) {
    const lobby = [];
    lobby.push(id);
    const createGameDto = new CreateGameDto();

    if (lobby.length > 0) {
      createGameDto.whiteId = lobby[0];
    }
    if (lobby.length == 2) {
      createGameDto.blackId = lobby[1];
      return this.createGame(createGameDto);
    }
  }

  async createGame(chessGame: CreateGameDto) {
    if (!chessGame.blackId || !chessGame.whiteId) {
      throw new NotAcceptableException('Need two players to play this game');
    }
    const wsResponse = await this.chessGameRepository.save(chessGame);
    this.chessGameGateway.server.emit('joinGame', wsResponse);
    return wsResponse;
  }

  async saveMoves(data: any) {
    const id = data.gameId;
    const chessGame = await this.chessGameRepository.findOneBy({ id: id });
    if (!chessGame)
      throw new NotFoundException('No game exists with this gameId');
    let piece = null;

    if (data.moves.capturedPiece) {
        piece = data.moves.capturedPiece;
      }
      const index = chessGame.pieces.indexOf(piece);
      if (index > -1) {
        chessGame.pieces.splice(index, 1);
      }
    chessGame.moves.push(data.moves);
    return this.chessGameRepository.save(chessGame);
  }

  async replayMoves(data: any) {
    const chessGame = await this.chessGameRepository.findOneBy({ id: data.id });
    if (!chessGame)
      throw new NotFoundException('No game exists with this gameId');
    return {
      id: chessGame.id,
      moves: chessGame.moves,
    };
  }

  async draw(data: any) {
    const chessGame = await this.chessGameRepository.findOneBy({ id: data.id });
    if (!chessGame)
      throw new NotFoundException('No game exists with this gameId');
    chessGame.isDraw = data.isDraw;
    return chessGame;
  }

  //for checkmate also you can send resign message as it has the same game logic
  async resign(data: any) {
    const chessGame = await this.chessGameRepository.findOneBy({ id: data.id });
    if (!chessGame)
      throw new NotFoundException('No game exists with this gameId');
    chessGame.winnerId = data.winner;
    chessGame.loserId = data.loser;
    return chessGame;
  }
}
