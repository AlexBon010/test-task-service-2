import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ILog } from '../../../broker';

@Injectable()
export class ElasticsearchDbService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async writeLog(log: ILog) {
        console.log(log);
        await this.elasticsearchService.index({
            index: log.timestamp.replace(/:/g, '-').toLowerCase(),
            body: {
                '@timestamp': new Date(log.timestamp).toISOString(),
                level: log.level,
                message: log.message,
                service: log.service,

            }
        });
    }
}
