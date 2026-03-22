import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number
  email: string
}

// стратегия аутентификации использующая JWT
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("JWT_SECRET"), 
        })
    }

    async validate(payload: JwtPayload) {
        // возвращаем объект, который будет доступен через @Req()
        return { userId: payload.sub, email: payload.email };
    }
}