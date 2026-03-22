import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { TaskType } from 'src/tasks/types/express';

// сервис для работы с Redis
@Injectable()
export class RedisService implements OnModuleInit {
    private client: Redis

    onModuleInit() {
        this.client = new Redis({
            host: "localhost",
            port: 6379,
        })
    }

    // получение данных через ключ
    async get(key: string) {
        const data = await this.client.get(key)
        return data ? JSON.parse(data) : null
    }

    // добавление данных по ключу
    async set(key: string, data: TaskType[], ttlSeconds?: number) {
        const dataStr = JSON.stringify(data)

        if (ttlSeconds) {
            await this.client.set(key, dataStr, 'EX', ttlSeconds)
        } else {
            await this.client.set(key, dataStr)
        }
    }

    // удаление данных по ключу
    async del(key: string) {
        await this.client.del(key)
    }
}
