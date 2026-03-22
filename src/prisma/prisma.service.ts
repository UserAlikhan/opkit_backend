import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";

// сервис для работы с базой данных через Prisma
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private config: ConfigService) {
        const adapter = new PrismaPg({
            connectionString: config.get<string>("DATABASE_URL"),
        })
        super({ adapter })
    }
}