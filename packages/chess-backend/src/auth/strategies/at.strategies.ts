import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Injectable } from "@nestjs/common";

type JwtPayload ={
    sub:number,
    username:string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtConstants.secret,
            ignoreExpiration:false
        });
    }
    validate(payload:JwtPayload){
        return { id: payload.sub, username: payload.username };
    }    
}