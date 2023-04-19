import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { PlayerDetailEntity } from '../../player/models/player.entity';
import { PlayerLoginDto } from '../../player/dtos/playerLogin.dto';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthService {
 
  
  constructor(
    @InjectRepository(PlayerDetailEntity)
    private readonly playerDetailRepository: Repository<PlayerDetailEntity>,
    private jwtService: JwtService
  ) {}


  //Get Tokens
  async getToken(username:string, id:number){
    const payload={sub:id,username}
    const [at,rt]=await Promise.all([

       this.jwtService.signAsync(payload,{
         secret:jwtConstants.secret,
        expiresIn:60*25,
      }),
      
       this.jwtService.signAsync(payload,{
        secret:jwtConstants.refreshSecret,
        expiresIn:60*60*24*7,
      }),

    ])
    return {
      access_token:at,
      refresh_token:rt
    }
  }


  //Login 
  async loginPlayer(playerLoginDto: PlayerLoginDto): Promise<any> {
    //Player Found or not
    let playerDetail = null;
    try {
      const where = [];
      if (playerLoginDto.username) {
        where.push({ username: playerLoginDto.username.toLowerCase() });
      }
      if (playerLoginDto.email) {
        where.push({ email: playerLoginDto.email });
      }
      playerDetail = await this.playerDetailRepository.findOne({
        select: ['id', 'username', 'password', 'email'],
        where,
      });
      if (!playerDetail) throw new Error('Player not found');
    } catch (error) {
      throw new NotFoundException('Something not found', {
        cause: error,
        description: 'Player not found with this email or username',
      });
    }

    //Check Password
    try {
      const match = await bcrypt.compareSync(playerLoginDto.password, playerDetail.password);
      if(!match) throw new Error('Invalid Password')
    } catch (error) {
      throw new UnauthorizedException();
    }

    //Get Tokens
    const tokens = await this.getToken(playerDetail.username,playerDetail.id);
    await this.updateRt(playerDetail.id,tokens.refresh_token)
    return {
      id: playerDetail.id,
      access_token: tokens.access_token,
      refresh_token:tokens.refresh_token
    };
  }

  //Update Refresh Token in DB
  async updateRt(id: number, refreshToken: string): Promise<UpdateResult> {
    refreshToken=await bcrypt.hash(refreshToken,10)
    return await this.playerDetailRepository.update(id,{refreshToken:refreshToken});
  }

  //Logout Method
  async logoutPlayer(id:number) {
    await this.playerDetailRepository.update(id,{refreshToken:null})
  }
  //Refresh Method
  async refreshToken(id:number,rt:string) {
    const playerDetail= await this.playerDetailRepository.findOne({where:{id:id}})
    if(!playerDetail) throw new ForbiddenException("Access Denied");
    const rtMatch= await bcrypt.compare(rt, playerDetail.refreshToken)
    if(!rtMatch) throw new ForbiddenException("Access Denied");
     //Get Tokens
     const tokens = await this.getToken(playerDetail.username,playerDetail.id);
     await this.updateRt(playerDetail.id,tokens.refresh_token)
     return {
       id: playerDetail.id,
       access_token: tokens.access_token,
       refresh_token:tokens.refresh_token
     };
  }
}
