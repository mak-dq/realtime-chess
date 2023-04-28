import { Module } from '@nestjs/common';
import { ChessGameService } from './chess-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChessGameEntity } from './chess-game.entity';
import { ChessGameController } from './chess-game.controller';
import { ChessGameGatewayModule } from '../gateway/chess-game.gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChessGameEntity]),
    ChessGameGatewayModule
  ],
  providers: [ChessGameService],
  exports:[ChessGameService, TypeOrmModule],
  controllers: [ChessGameController],
})
export class ChessGameModule {}
