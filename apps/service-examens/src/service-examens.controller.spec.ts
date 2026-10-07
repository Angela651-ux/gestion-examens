import { Test, TestingModule } from '@nestjs/testing';
import { ServiceExamensController } from './service-examens.controller';
import { ServiceExamensService } from './service-examens.service';

describe('ServiceExamensController', () => {
  let serviceExamensController: ServiceExamensController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceExamensController],
      providers: [ServiceExamensService],
    }).compile();

    serviceExamensController = app.get<ServiceExamensController>(ServiceExamensController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceExamensController.getHello()).toBe('Hello World!');
    });
  });
});
