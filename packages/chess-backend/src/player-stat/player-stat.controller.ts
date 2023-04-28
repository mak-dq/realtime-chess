import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PlayerStatService } from './player-stat.service';
import { PlayerStatDto } from './dtos/playerStat.dto';

@Controller('player-stat')
export class PlayerStatController {

    constructor(private playerStatService : PlayerStatService){}

    @Get()
    getPlayerStat(@Request() req){
        return this.playerStatService.getPlayerStat(req.user.id);
    }
}
