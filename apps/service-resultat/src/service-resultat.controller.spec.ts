import { Test, TestingModule } from '@nestjs/testing';
import { ServiceResultatController } from './service-resultat.controller';
import { ServiceResultatService } from './service-resultat.service';

describe('ServiceResultatController', () => {
  let serviceResultatController: ServiceResultatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceResultatController],
      providers: [ServiceResultatService],
    }).compile();

    serviceResultatController = app.get<ServiceResultatController>(ServiceResultatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceResultatController.getHello()).toBe('Hello World!');
    });
  });
});
