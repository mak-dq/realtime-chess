import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.get('Refresh').replace('Bearer', '').trim();
      }]),
      secretOrKey: jwtConstants.refreshSecret,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Refresh').replace('Bearer', '').trim();
    console.log(refreshToken);
    return { id: payload.sub, username: payload.username, refreshToken };
  }
}
