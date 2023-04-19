import { IsEmail, IsNotEmpty } from "class-validator";

export class PlayerDetailDto {
    id:number;
    fname:string;
    lname:string;
    age:number;
    @IsNotEmpty()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
}