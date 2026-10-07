import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAuthentifcationController } from './service-authentifcation.controller';
import { ServiceAuthentifcationService } from './service-authentifcation.service';

describe('ServiceAuthentifcationController', () => {
  let serviceAuthentifcationController: ServiceAuthentifcationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAuthentifcationController],
      providers: [ServiceAuthentifcationService],
    }).compile();

    serviceAuthentifcationController = app.get<ServiceAuthentifcationController>(ServiceAuthentifcationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceAuthentifcationController.getHello()).toBe('Hello World!');
    });
  });
});
