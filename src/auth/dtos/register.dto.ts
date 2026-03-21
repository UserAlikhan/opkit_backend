import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one uppercase letter and one number',
    })
    password: string;
}