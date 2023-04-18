import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlayerLoginDto } from '../player/dtos/playerLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginPlayer(@Body() playerLoginDto: PlayerLoginDto): Promise<any> {
    return await this.authService.loginPlayer(playerLoginDto);
  }
}
