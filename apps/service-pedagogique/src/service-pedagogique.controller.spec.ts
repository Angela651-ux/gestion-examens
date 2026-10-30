import { Test, TestingModule } from '@nestjs/testing';
import { ServicePedagogiqueController } from './service-pedagogique.controller';
import { ServicePedagogiqueService } from './service-pedagogique.service';

describe('ServicePedagogiqueController', () => {
  let servicePedagogiqueController: ServicePedagogiqueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServicePedagogiqueController],
      providers: [ServicePedagogiqueService],
    }).compile();

    servicePedagogiqueController = app.get<ServicePedagogiqueController>(ServicePedagogiqueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(servicePedagogiqueController.getHello()).toBe('Hello World!');
    });
  });
});
