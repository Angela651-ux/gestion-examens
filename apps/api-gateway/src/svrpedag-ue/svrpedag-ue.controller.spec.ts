import { Test, TestingModule } from '@nestjs/testing';
import { SvrpedagUeController } from './svrpedag-ue.controller';

describe('SvrpedagUeController', () => {
  let controller: SvrpedagUeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrpedagUeController],
    }).compile();

    controller = module.get<SvrpedagUeController>(SvrpedagUeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
