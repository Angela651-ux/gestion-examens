import { Test, TestingModule } from '@nestjs/testing';
import { ChefmentionController } from './chefmention.controller';

describe('ChefmentionController', () => {
  let controller: ChefmentionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChefmentionController],
    }).compile();

    controller = module.get<ChefmentionController>(ChefmentionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
