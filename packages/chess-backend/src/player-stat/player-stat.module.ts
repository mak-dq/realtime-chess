import { Module } from '@nestjs/common';
import { PlayerStatController } from './player-stat.controller';
import { PlayerStatService } from './player-stat.service';

@Module({
  controllers: [PlayerStatController],
  providers: [PlayerStatService]
})
export class PlayerStatModule {}
