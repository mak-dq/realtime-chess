import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePlayerDto{
    fname:string;
    lname?:string;
    age?:number;
    username:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
}