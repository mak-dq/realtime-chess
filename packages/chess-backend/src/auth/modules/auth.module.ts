import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { APP_GUARD } from '@nestjs/core';
import { AtStrategy, RtStrategy } from '../strategies';
import { PlayerModule } from '../../player/player.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';

@Module({
  imports: [JwtModule.register({}), PlayerModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
