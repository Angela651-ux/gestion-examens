import { Test, TestingModule } from '@nestjs/testing';
import { ConcernerController } from './concerner.controller';

describe('ConcernerController', () => {
  let controller: ConcernerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcernerController],
    }).compile();

    controller = module.get<ConcernerController>(ConcernerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
