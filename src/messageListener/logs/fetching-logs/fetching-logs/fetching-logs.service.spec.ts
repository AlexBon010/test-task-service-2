import { Test, TestingModule } from '@nestjs/testing';
import { FetchingLogsService } from './fetching-logs.service';

describe('FetchingLogsService', () => {
  let service: FetchingLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchingLogsService],
    }).compile();

    service = module.get<FetchingLogsService>(FetchingLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
