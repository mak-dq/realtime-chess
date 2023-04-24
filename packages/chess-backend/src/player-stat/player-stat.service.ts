import { Injectable } from '@nestjs/common';
import { PlayerStatDto } from './dtos/playerStat.dto';

@Injectable()
export class PlayerStatService {
    createPlayerStat(playerStat: PlayerStatDto) {
        return null;
    }
}
