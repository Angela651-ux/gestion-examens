import { Test, TestingModule } from '@nestjs/testing';
import { SvrpedagEcController } from './svrpedag-ec.controller';

describe('SvrpedagEcController', () => {
  let controller: SvrpedagEcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrpedagEcController],
    }).compile();

    controller = module.get<SvrpedagEcController>(SvrpedagEcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
