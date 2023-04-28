import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
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
    @Param('id') id: string, @Request() req

  ): Promise<Observable<PlayerDetailDto>> {
    return await this.playerService.getPlayerById(id,req.user.id);
  }
  @Delete('/:id')
  deletePlayerById(@Request() req,
    @Param('id') id: string

  ): Promise<DeleteResult> {
    return this.playerService.deletePlayerById(id,req.user.id);
  }
  @Patch('/:id')
  updatePlayer(
    @Param('id') id:string,

    @Body() playerDetailDto: PlayerDetailDto, @Request() req
  ): Promise<UpdateResult> {
    return this.playerService.updatePlayer(id,playerDetailDto,req.user.id);
  }

  @Post('/:id/changePassword')
  changePassword(
    @Param('id') id:string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Body() newPassword: string
  ): Promise<UpdateResult> {
    return this.playerService.changePassword(id,changePasswordDto, newPassword);
  }
}
