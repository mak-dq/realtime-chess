import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChessGameEntity } from './chess-game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChessGameService {
  constructor(
    @InjectRepository(ChessGameEntity)
    private readonly chessGameRepository: Repository<ChessGameEntity>
  ) {}

  async handleJoinGame(data: any, id: number) {
    const game = await this.chessGameRepository.findOne(data.gameId);
    // setTimeout(()=>{
    //     console.log('Inside Game Lobby');
    // },30000)

    if (!game) {
      throw new NotFoundException(`Game with id ${data.gameId} not found`);
    }

    if (game.playerIds.length >= 2) {
      throw new BadRequestException('Game is full');
    }

    game.playerIds.push(id);

    return this.chessGameRepository.save(game);
  }
}
