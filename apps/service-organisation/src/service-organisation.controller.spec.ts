import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrganisationController } from './service-organisation.controller';
import { ServiceOrganisationService } from './service-organisation.service';

describe('ServiceOrganisationController', () => {
  let serviceOrganisationController: ServiceOrganisationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrganisationController],
      providers: [ServiceOrganisationService],
    }).compile();

    serviceOrganisationController = app.get<ServiceOrganisationController>(ServiceOrganisationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceOrganisationController.getHello()).toBe('Hello World!');
    });
  });
});
