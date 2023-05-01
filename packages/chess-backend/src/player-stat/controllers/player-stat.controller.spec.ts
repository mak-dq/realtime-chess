import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatController } from './player-stat.controller';

describe('PlayerStatController', () => {
  let controller: PlayerStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerStatController],
    }).compile();

    controller = module.get<PlayerStatController>(PlayerStatController);
  });

  
});
