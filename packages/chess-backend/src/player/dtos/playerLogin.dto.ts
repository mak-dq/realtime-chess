import { IsEmail, IsNotEmpty } from "class-validator";

export class PlayerLoginDto{
    username?:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password:string;
}