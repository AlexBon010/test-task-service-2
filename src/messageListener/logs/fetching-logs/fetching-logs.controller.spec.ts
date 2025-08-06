import { Test, TestingModule } from '@nestjs/testing';
import { FetchingLogsController } from './fetching-logs.controller';

describe('FetchingLogsController', () => {
  let controller: FetchingLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchingLogsController],
    }).compile();

    controller = module.get<FetchingLogsController>(FetchingLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
