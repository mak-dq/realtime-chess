import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatEntity } from './models/player-stat.entity';
import { Repository } from 'typeorm';
import { ChessGameEntity } from '../chess-game/chess-game.entity';
import { PlayerStatDto } from './dtos/playerStat.dto';

@Injectable()
export class PlayerStatService {
  constructor(
    @InjectRepository(PlayerStatEntity)
    private readonly playerStatRepository: Repository<PlayerStatEntity>,
    @InjectRepository(ChessGameEntity)
    private readonly chessGameRepository: Repository<ChessGameEntity>
  ) {}

  async createPlayerStat(id: string) {
    console.log(id);
    id = JSON.parse(JSON.stringify(id));
    console.log(id);

    console.log('inside creating  player stat');
    let chessGame = null;
    try {
      const where = [];
      where.push({ blackId: id });
      where.push({ whiteId: id });
      chessGame = await this.chessGameRepository.find({
        where,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(chessGame);

    if (!chessGame[0])
      throw new NotFoundException('Player has not played any game');
    const playerStatDto = new PlayerStatDto();
    let count = 0,
      winCount = 0,
      lossCount = 0;
    chessGame.forEach((e) => {
      if (e.winnerId == id) {
        winCount++;
      } else if (e.loserId == id) {
        lossCount++;
      }
      count++;
    });
    playerStatDto.gameCount = count;
    playerStatDto.winCount = winCount;
    playerStatDto.lossCount = lossCount;
    playerStatDto.playerId = id;
    return this.playerStatRepository.save(playerStatDto);
  }
  getPlayerStat(id: any) {
    let playerStat = null;
    try {
      playerStat = this.createPlayerStat(id);
    } catch (err) {
      throw new Error(err);
    }
    return playerStat;
  }
}
