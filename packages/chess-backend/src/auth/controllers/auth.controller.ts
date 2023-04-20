import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerLoginDto } from '../../player/dtos/playerLogin.dto';
import { Public } from '../../common/decorators/public.decorator';
import { PlayerDetail } from '../../player/models/player.interface';
import { RtGuard } from '../../common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginPlayer(@Body() playerLoginDto: PlayerLoginDto){
    return this.authService.loginPlayer(playerLoginDto);
  }
  
  @Post('logout')  
  @HttpCode(HttpStatus.OK)
  logoutTokens(@Request() req) : Promise<PlayerDetail>{
    return this.authService.logoutPlayer(req.user.id,req.user.username);
  }
  
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Request() req){
    console.log(req.user);
    
    return this.authService.refreshToken(req.user.id,req.user.refreshToken);
  }
}
