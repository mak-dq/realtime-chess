import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '../player/modules/player.module';
import { AuthModule } from '../auth/modules/auth.module';
import { ChessGameModule } from '../chess-game/chess-game.module';
import { PlayerStatModule } from '../player-stat/player-stat.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PlayerModule,
    AuthModule,
    ChessGameModule,
    PlayerStatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
