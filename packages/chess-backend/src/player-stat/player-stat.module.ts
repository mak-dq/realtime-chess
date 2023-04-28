import { Module } from '@nestjs/common';
import { PlayerStatController } from './player-stat.controller';
import { PlayerStatService } from './player-stat.service';
import { ChessGameModule } from '../chess-game/chess-game.module';
import { PlayerStatEntity } from './models/player-stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PlayerStatEntity]),ChessGameModule],
  controllers: [PlayerStatController],
  providers: [PlayerStatService]
})
export class PlayerStatModule {}
