import { Module } from '@nestjs/common';
import { PlayerController } from './controllers/player/player.controller';
import { PlayerService } from './services/player/player.service';
import { PlayerDetailEntity} from './models/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerDetailEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports:[PlayerService, TypeOrmModule]
})
export class PlayerModule {}
