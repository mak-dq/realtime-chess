import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    PlayerModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
