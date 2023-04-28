import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '../player/modules/player.module';
import { AuthModule } from '../auth/modules/auth.module';
import { ChessGameModule } from '../chess-game/chess-game.module';
import { PlayerStatModule } from '../player-stat/player-stat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayerModule,
    AuthModule,
    ChessGameModule,
    PlayerStatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
