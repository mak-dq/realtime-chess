import { IsEmail, IsNumber, IsString } from "class-validator";

export class PlayerDetailDto {
    @IsString()
    fname:string;
    @IsString()
    lname:string;
    @IsNumber()
    age:number;
    @IsString()
    username: string;
    @IsEmail()
    email:string;
}