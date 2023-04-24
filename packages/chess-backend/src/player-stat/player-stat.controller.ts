import { Body, Controller, Post } from '@nestjs/common';
import { PlayerStatService } from './player-stat.service';
import { PlayerStatDto } from './dtos/playerStat.dto';

@Controller('player-stat')
export class PlayerStatController {

    constructor(private playerStatService : PlayerStatService){}

    @Post()
    creatPlayerStat(@Body('stats') playerStat:PlayerStatDto){
        return this.playerStatService.createPlayerStat(playerStat);
    }
}
