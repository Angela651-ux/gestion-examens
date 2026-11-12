import { Test, TestingModule } from '@nestjs/testing';
import { SvrorgController } from './svrorg.controller';

describe('SvrorgController', () => {
  let controller: SvrorgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrorgController],
    }).compile();

    controller = module.get<SvrorgController>(SvrorgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
