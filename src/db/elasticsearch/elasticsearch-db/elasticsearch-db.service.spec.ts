import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchDbService } from './elasticsearch-db.service';

describe('ElasticsearchDbService', () => {
  let service: ElasticsearchDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticsearchDbService],
    }).compile();

    service = module.get<ElasticsearchDbService>(ElasticsearchDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
