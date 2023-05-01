import { Module } from '@nestjs/common';
import { PlayerStatService } from './services/player-stat.service';
import { PlayerStatEntity } from './models/player-stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChessGameModule } from '../chess-game/chess-game.module';
import { PlayerStatController } from './controllers/player-stat.controller';

@Module({
  imports:[TypeOrmModule.forFeature([PlayerStatEntity]),ChessGameModule],
  controllers: [PlayerStatController],
  providers: [PlayerStatService]
})
export class PlayerStatModule {}
