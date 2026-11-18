import { Test, TestingModule } from '@nestjs/testing';
import { ConcernerService } from './concerner.service';

describe('ConcernerService', () => {
  let service: ConcernerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcernerService],
    }).compile();

    service = module.get<ConcernerService>(ConcernerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
