import { Test, TestingModule } from '@nestjs/testing';
import { ServicePersonnelController } from './service-personnel.controller';
import { ServicePersonnelService } from './service-personnel.service';

describe('ServicePersonnelController', () => {
  let servicePersonnelController: ServicePersonnelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServicePersonnelController],
      providers: [ServicePersonnelService],
    }).compile();

    servicePersonnelController = app.get<ServicePersonnelController>(ServicePersonnelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(servicePersonnelController.getHello()).toBe('Hello World!');
    });
  });
});
