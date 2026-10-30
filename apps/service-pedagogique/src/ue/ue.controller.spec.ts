import { Test, TestingModule } from '@nestjs/testing';
import { UeController } from './ue.controller';

describe('UeController', () => {
  let controller: UeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UeController],
    }).compile();

    controller = module.get<UeController>(UeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
