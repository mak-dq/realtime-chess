import { Module } from '@nestjs/common';
import { ChessGameService } from './chess-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChessGameEntity } from './chess-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChessGameEntity])],
  providers: [ChessGameService]
})
export class ChessGameModule {}
