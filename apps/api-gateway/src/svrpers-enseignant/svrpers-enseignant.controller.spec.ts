import { Test, TestingModule } from '@nestjs/testing';
import { SvrpersEnseignantController } from './svrpers-enseignant.controller';

describe('SvrpersEnseignantController', () => {
  let controller: SvrpersEnseignantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvrpersEnseignantController],
    }).compile();

    controller = module.get<SvrpersEnseignantController>(SvrpersEnseignantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
