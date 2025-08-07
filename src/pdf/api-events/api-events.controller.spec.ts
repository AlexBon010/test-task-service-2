import { Test, TestingModule } from '@nestjs/testing';
import { ApiEventsController } from './api-events.controller';

describe('ApiEventsController', () => {
  let controller: ApiEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiEventsController],
    }).compile();

    controller = module.get<ApiEventsController>(ApiEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
