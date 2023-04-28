import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePlayerDto{
    @IsNotEmpty()
    fname:string;
    lname:string;
    age:number;
    @IsNotEmpty()
    username:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
}