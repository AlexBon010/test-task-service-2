import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

import { ElasticsearchDbService } from './elasticsearch-db/elasticsearch-db.service';

@Module({
    imports: [ElasticsearchModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const host = configService.get<string>('ELASTICSEARCH_HOST')!;
            const port = configService.get<number>('ELASTICSEARCH_PORT')!;
            return {
                node: `http://${host}:${port}`,
            };
        },
    })],
    providers: [ElasticsearchDbService],
    exports: [ElasticsearchDbService],
})
export class ElasticsearchDbModule {
}