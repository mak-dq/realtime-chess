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
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.refreshSecret,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
     return { id: payload.sub, username: payload.username, refreshToken };
  }
}
