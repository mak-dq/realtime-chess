import { Controller, Get, Request } from '@nestjs/common';
import { PlayerStatService } from '../services/player-stat.service';

@Controller('player-stat')
export class PlayerStatController {

    constructor(private playerStatService : PlayerStatService){}

    @Get()
    getPlayerStat(@Request() req:any){
        return this.playerStatService.getPlayerStat(req.user.id);
    }
}
