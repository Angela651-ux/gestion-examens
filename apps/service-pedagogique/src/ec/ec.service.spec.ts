import { Test, TestingModule } from '@nestjs/testing';
import { EcService } from './ec.service';

describe('EcService', () => {
  let service: EcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcService],
    }).compile();

    service = module.get<EcService>(EcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
