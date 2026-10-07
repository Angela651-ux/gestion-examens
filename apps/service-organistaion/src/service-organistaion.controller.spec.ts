import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrganistaionController } from './service-organistaion.controller';
import { ServiceOrganistaionService } from './service-organistaion.service';

describe('ServiceOrganistaionController', () => {
  let serviceOrganistaionController: ServiceOrganistaionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrganistaionController],
      providers: [ServiceOrganistaionService],
    }).compile();

    serviceOrganistaionController = app.get<ServiceOrganistaionController>(ServiceOrganistaionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceOrganistaionController.getHello()).toBe('Hello World!');
    });
  });
});
