# OpKit Backend

## Описание проекта
OpKit Backend — это backend на **NestJS**, реализующий управление задачами (CRUD) с поддержкой **WebSocket (Socket.IO)** для real-time обновлений, **Redis** для кеширования и **Prisma** для работы с PostgreSQL.  

Проект позволяет:
- Авторизовываться с JWT токеном  
- Создавать, обновлять и удалять задачи  
- Получать обновления задач в реальном времени через WebSocket  
- Кэшировать данные для ускорения работы  

---

## Структура проекта
```
src/
├── auth/ # Модуль авторизации
│ ├── dtos/ # DTO для логина и регистрации (LoginDto, RegisterDto)
│ ├── guards/ # Guards для авторизации (JwtAuthGuard)
│ ├── auth.service.ts # Сервис авторизации
│ ├── auth.controller.ts # Контроллер для login/register
├── tasks/ # Модуль задач
│ ├── dtos/ # DTO для создания и обновления задач (CreateTaskDto, UpdateTaskDto)
│ ├── decorators/ # Пользовательские декораторы (@TaskOwner)
│ ├── guards/ # Guards для защиты задач
│ ├── types/ # Типы и интерфейсы для задач
│ ├── tasks.service.ts # Сервис с CRUD и логикой задач
│ ├── tasks.gateway.ts # WebSocket gateway для real-time обновлений
│ └── tasks.controller.ts # Контроллер с REST API задач
├── prisma/ # Prisma сервис
├── redis/ # Redis сервис для кеширования
├── main.ts # Точка входа приложения
└── app.module.ts # Главный модуль NestJS, объединяет все модули
```

---

## Используемые технологии
- **NestJS** — backend framework на Node.js  
- **TypeScript** — статическая типизация  
- **Prisma** — ORM для работы с PostgreSQL  
- **PostgreSQL** — база данных  
- **Redis** — кеширование  
- **Socket.IO** — real-time WebSocket  
- **Docker & docker-compose** — контейнеризация и локальный запуск  
- **JWT** — аутентификация  

---

## Локальный запуск

### 1. Установка зависимостей
```
npm install
```

### 2. Настройка переменных окружения
Создайте файл **.env** в корне проекта с настройками базы данных и JWT:

```
PORT=3000
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=opkit
DB_PORT=5433
DB_HOST=localhost
DATABASE_URL="postgresql://root:password@localhost:5433/opkit"
JWT_SECRET=secret
```

### 3. Запуск БД и Redis в Docker
```
docker-compose up -d
```

Это поднимет PostgreSQL и Redis, если они используются через контейнеры.

### 4. Запуск приложения
```
npm run start
```