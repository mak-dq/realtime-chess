import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Injectable } from "@nestjs/common";

type JwtPayload ={
    id:string,
    username:string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:jwtConstants.secret
        });
    }
    validate(payload:JwtPayload){
        return payload;//req.user=payload
    }    
}