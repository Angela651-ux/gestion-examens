import { Test, TestingModule } from '@nestjs/testing';
import { EcController } from './ec.controller';

describe('EcController', () => {
  let controller: EcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcController],
    }).compile();

    controller = module.get<EcController>(EcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
