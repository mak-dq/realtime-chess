import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerDetailEntity } from '../models/player.entity';
import { PlayerController } from '../controllers/player/player.controller';
import { PlayerService } from '../services/player/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerDetailEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports:[PlayerService, TypeOrmModule]
})
export class PlayerModule {}
