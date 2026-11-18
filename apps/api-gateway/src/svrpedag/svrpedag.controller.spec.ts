import { Test, TestingModule } from '@nestjs/testing';
import { SvrpedagController } from './svrpedag.controller';

describe('SvrpedagController', () => {
  let controller: SvrpedagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrpedagController],
    }).compile();

    controller = module.get<SvrpedagController>(SvrpedagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
