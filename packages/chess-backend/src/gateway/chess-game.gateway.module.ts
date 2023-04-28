import { Module, forwardRef } from '@nestjs/common';
import { ChessGameGateway } from './chess-game.gateway';
import { ChessGameModule } from '../chess-game/chess-game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChessGameEntity } from '../chess-game/chess-game.entity';

@Module({
    providers:[ChessGameGateway],
    exports:[ChessGameGateway],
    imports:[forwardRef(()=>ChessGameModule), TypeOrmModule.forFeature([ChessGameEntity])]
})
export class ChessGameGatewayModule {}
