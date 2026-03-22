import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// кастомный Guard, который отвечает за проверку аутентификации 
// пользователя через Jwt токен
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}