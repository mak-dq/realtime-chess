import { Test, TestingModule } from '@nestjs/testing';
import { ChessGameController } from './chess-game.controller';

describe('ChessGameController', () => {
  let controller: ChessGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChessGameController],
    }).compile();

    controller = module.get<ChessGameController>(ChessGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
