import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { beforeEach } from 'node:test';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
