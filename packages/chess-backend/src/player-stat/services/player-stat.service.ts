import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatEntity } from '../models/player-stat.entity';
import { Repository } from 'typeorm';
import { PlayerStatDto } from '../dtos/playerStat.dto';
import { ChessGameEntity } from '../../chess-game/models/chess-game.entity';

@Injectable()
export class PlayerStatService {
  constructor(
    @InjectRepository(PlayerStatEntity)
    private readonly playerStatRepository: Repository<PlayerStatEntity>,
    @InjectRepository(ChessGameEntity)
    private readonly chessGameRepository: Repository<ChessGameEntity>
  ) {}

  async createPlayerStat(id: string) {
    id = JSON.parse(JSON.stringify(id));
    let chessGame = null;
    try {
      const where = [];
      where.push({ blackId: id });
      where.push({ whiteId: id });
      chessGame = await this.chessGameRepository.find({
        where,
      });
    } catch (error) {
       throw new Error(error)
    }

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
    this.playerStatRepository.save(playerStatDto);
    return playerStatDto;
  }
  async getPlayerStat(id: any) {
    let playerStatDto:PlayerStatDto = null;
    try {
      playerStatDto = await this.createPlayerStat(id);
    } catch (err) {
      throw new Error(err);
    }
    return playerStatDto;
  }
}
