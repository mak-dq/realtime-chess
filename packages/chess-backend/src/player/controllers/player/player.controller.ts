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
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PlayerDetailDto } from '../../dtos/playerDetail.dto';
import { CreatePlayerDto } from '../../dtos/createPlayer.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { ChangePasswordDto } from '../../dtos/changePassword.dto';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Public()
  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto
  ): Promise<PlayerDetailDto> {
    return await this.playerService.createPlayer(createPlayerDto);
  }

  @Public()
  @Get()
  async getPlayer(): Promise<Observable<PlayerDetailDto[]>> {
    return await this.playerService.getPlayer();
  }
  @Get('/:id')
  async getPlayerById(
    @Param('id') id: number
  ): Promise<Observable<PlayerDetailDto>> {
    return await this.playerService.getPlayerById(id);
  }
  @Delete('/:id')
  deletePlayerById(
    @Param('id') id: number
  ): Promise<DeleteResult> {
    return this.playerService.deletePlayerById(id);
  }
  @Patch('/:id')
  updatePlayer(
    @Param('id') id:number,
    @Body() playerDetailDto: PlayerDetailDto
  ): Promise<UpdateResult> {
    return this.playerService.updatePlayer(id,playerDetailDto);
  }

  @Post('/:id/changePassword')
  changePassword(
    @Param('id') id:number,
    @Body() changePasswordDto: ChangePasswordDto,
    @Body() newPassword: string
  ): Promise<UpdateResult> {
    return this.playerService.changePassword(id,changePasswordDto, newPassword);
  }
}
