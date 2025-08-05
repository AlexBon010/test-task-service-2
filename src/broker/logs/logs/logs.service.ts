import { Injectable } from '@nestjs/common';
import { ILog } from '../interfaces/log.interface';
import { ElasticsearchDbService } from 'src/db/elasticsearch/elasticsearch-db/elasticsearch-db.service';

@Injectable()
export class LogsService {
    constructor(private readonly elasticsearchDbService: ElasticsearchDbService
    ) { }

    async handleLogs(log: ILog) {
        await this.elasticsearchDbService.writeLog(log)
    }
}
