import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatService } from './player-stat.service';

describe('PlayerStatService', () => {
  let service: PlayerStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerStatService],
    }).compile();

    service = module.get<PlayerStatService>(PlayerStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
