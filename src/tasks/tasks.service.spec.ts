import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService (smoke test)', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: 'PrismaService', useValue: {} },
        { provide: 'RedisService', useValue: {} },
        { provide: 'TasksGateway', useValue: {} },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have basic methods', () => {
    expect(typeof service.findAll).toBe('function');
    expect(typeof service.create).toBe('function');
    expect(typeof service.update).toBe('function');
    expect(typeof service.remove).toBe('function');
  });
});