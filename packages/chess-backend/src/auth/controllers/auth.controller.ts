import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerLoginDto } from '../../player/dtos/playerLogin.dto';
import { Public } from '../../app/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginPlayer(@Body() playerLoginDto: PlayerLoginDto): Promise<any> {
    return this.authService.loginPlayer(playerLoginDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')  
  @HttpCode(HttpStatus.OK)
  logoutTokens(@Req() req:Request){
    const user=req.user;
    return this.authService.logoutPlayer(user['id']);
  }
  
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req:Request){
    const user=req.user;
    return this.authService.refreshToken(user['id'],user['refreshToken']);
  }
}
