import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Dto для валидации данных для авторизации
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}