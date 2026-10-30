import { Test, TestingModule } from '@nestjs/testing';
import { ChefmentionService } from './chefmention.service';

describe('ChefmentionService', () => {
  let service: ChefmentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChefmentionService],
    }).compile();

    service = module.get<ChefmentionService>(ChefmentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
