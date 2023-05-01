import { Module } from '@nestjs/common';
import { ChessGameService } from './services/chess-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChessGameGatewayModule } from '../gateway/chess-game.gateway.module';
import { ChessGameEntity } from './models/chess-game.entity';
import { ChessGameController } from './controllers/chess-game.controller';

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
