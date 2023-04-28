import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AtStrategy, RtStrategy } from '../strategies';
import { PlayerModule } from '../../player/modules/player.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RtGuard } from '../../common/guards';

@Module({
  imports: [JwtModule.register({}), PlayerModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AtStrategy,
    RtStrategy,
    RtGuard
  ],
})
export class AuthModule {}
