import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PlayerDetailEntity } from '../player/models/player.entity';
import { PlayerLoginDto } from '../player/dtos/playerLogin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PlayerDetailEntity)
    private readonly playerDetailRepository: Repository<PlayerDetailEntity>,
    private jwtService: JwtService
  ) {}

  async loginPlayer(playerLoginDto: PlayerLoginDto): Promise<any> {
    console.log('loginDto', playerLoginDto);

    let playerDetail = null;
    try {
      playerDetail = await this.playerDetailRepository.findOneBy({
        email: playerLoginDto.email,
      });
      if (!playerDetail) {
        playerDetail = await this.playerDetailRepository.findOneBy({
          username: playerLoginDto.username,
        });
        if (!playerDetail) throw new Error('Player not found');
      }
    } catch (error) {
      throw new NotFoundException('Something not found', {
        cause: error,
        description: 'Player not found with this email',
      });
    }
    console.log('playerDetail', playerDetail);
    try {
      await this.checkPassword(playerLoginDto.password, playerDetail.password);
    } catch (error) {
      throw new UnauthorizedException();
    }
    const payload = {
      playerId: playerDetail.id,
      username: playerDetail.username,
      email: playerDetail.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    playerDetail.token = accessToken;
    this.playerDetailRepository.save(playerDetail);
    return {
      access_token:accessToken,

    }
  }
  //Check Password
  async checkPassword(password: string, hashedPassword: string) {
    console.log('check');
    try {
      const match = await bcrypt.compareSync(password, hashedPassword);
      console.log(match);
      if (match == false) {
        throw new Error('Invalid Password');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
