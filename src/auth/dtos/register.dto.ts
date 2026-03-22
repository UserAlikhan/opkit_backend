import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

// Dto для валидации данных для регистрации
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one uppercase letter and one number',
    })
    password: string;
}