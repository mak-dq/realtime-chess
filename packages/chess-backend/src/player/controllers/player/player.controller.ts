import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayerService } from '../../services/player/player.service';
import { PlayerDetailEntity } from '../../models/player.entity';
import { Observable } from 'rxjs';
import { PlayerDetail } from '../../models/player.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import { CreatePlayerDto } from '../../dtos/createPlayer.dto';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto
  ): Promise<Observable<PlayerDetailEntity>> {
    return await this.playerService.createPlayer(createPlayerDto);
  }

  @Get()
  async getPlayer(): Promise<Observable<PlayerDetailDto[]>> {
    return await this.playerService.getPlayer();
  }
  @Get('/:id')
  async getPlayerById(@Param('id') id: number): Promise<Observable<PlayerDetailDto>> {
    return await this.playerService.getPlayerById(id);
  }
  @Delete('/:id')
  async deletePlayerById(
    @Param('id') id: number
  ): Promise<Observable<DeleteResult>> {
    return await this.playerService.deletePlayerById(id);
  }
  @Patch()
  async updatePlayerById(
    @Body() playerDetailDto: PlayerDetailDto
  ): Promise<Observable<UpdateResult>> {
    return await this.playerService.updatePlayerById(playerDetailDto);
  }
  
  
}
