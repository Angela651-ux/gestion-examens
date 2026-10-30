import { Test, TestingModule } from '@nestjs/testing';
import { SvrpedagParcoursController } from './svrpedag-parcours.controller';

describe('SvrpedagParcoursController', () => {
  let controller: SvrpedagParcoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrpedagParcoursController],
    }).compile();

    controller = module.get<SvrpedagParcoursController>(SvrpedagParcoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
