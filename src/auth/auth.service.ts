import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(dto: RegisterDto) {
        const hashed_password = await bcrypt.hash(dto.password, 10)
        const user = await this.prismaService.user.create({
            data: { email: dto.email, password: hashed_password },
        })

        return { id: user.id, email: user.email }
    }

    async login(dto: LoginDto) {
        const user = await this.prismaService.user.findUnique({ 
            where: { email: dto.email } 
        })
        if (!user) {
            throw new UnauthorizedException("Invalid credentials!")
        }

        const passwordsMatch = await bcrypt.compare(dto.password, user.password)
        if (!passwordsMatch) {
            throw new UnauthorizedException("Invalid credentials!")
        }

        const payload = { sub: user.id, email: user.email }
        const token = this.jwtService.sign(payload, { expiresIn: "1h" })

        return { access_token: token }
    }
}
