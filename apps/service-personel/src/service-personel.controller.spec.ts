import { Test, TestingModule } from '@nestjs/testing';
import { ServicePersonelController } from './service-personel.controller';
import { ServicePersonelService } from './service-personel.service';

describe('ServicePersonelController', () => {
  let servicePersonelController: ServicePersonelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServicePersonelController],
      providers: [ServicePersonelService],
    }).compile();

    servicePersonelController = app.get<ServicePersonelController>(ServicePersonelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(servicePersonelController.getHello()).toBe('Hello World!');
    });
  });
});
