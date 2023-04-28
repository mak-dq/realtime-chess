import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
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

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Headers('authorization') refreshToken:string){
    refreshToken= refreshToken.replace('Bearer','').trim();
    return this.authService.refreshToken(refreshToken);
  }
}
