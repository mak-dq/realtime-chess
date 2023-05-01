import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatService } from './player-stat.service';
import { PlayerStatDto } from '../dtos/playerStat.dto';
import { Repository } from 'typeorm';
import { PlayerStatEntity } from '../models/player-stat.entity';
import { ChessGameEntity } from '../../chess-game/models/chess-game.entity';
import { NotFoundException } from '@nestjs/common';

describe('PlayerStatService', () => {
  let service: PlayerStatService;
  let chessGameRepository: Repository<ChessGameEntity>;
  let playerStatRepository: Repository<PlayerStatEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PlayerStatService,
          useValue: {
            createPlayerStat: jest.fn(),
            getPlayerStat: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerStatService>(PlayerStatService);
  });

  describe('createPlayerStat', async () => {
    it('should create a player stat entry and return player stat entity', async () => {
      const id = '123';
      const playerStatDto: PlayerStatDto = {
        gameCount: 1,
        winCount: 1,
        lossCount: 0,
        playerId: id,
      };
      const result = await service.createPlayerStat(id);
      expect(result).toEqual(playerStatDto);

      jest
        .spyOn(service, 'createPlayerStat')
        .mockResolvedValueOnce(playerStatDto);
    });

    it('should throw NotFoundException if game does not exist with player id', async () => {
      const whiteId = '123';
      const blackId = '321';
      beforeEach(() => {
        chessGameRepository.findOne({
          where: [
            {
              id: whiteId,
            },
            {
              id: blackId,
            },
          ],
        });
      });
      await expect(
        service.createPlayerStat(null)
      ).rejects.toThrowError(NotFoundException)
    });
  });
});
