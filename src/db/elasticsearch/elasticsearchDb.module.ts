import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ElasticsearchModule, ElasticsearchService } from "@nestjs/elasticsearch";

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
    providers: [],
})
export class ElasticsearchDbModule implements OnModuleInit {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async onModuleInit() {
        try {
            const pingResponse = await this.elasticsearchService.ping();
            if (pingResponse) {
                console.log('Successfully connected to Elasticsearch');
            } else {
                console.error('Could not connect to Elasticsearch');
            }
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }
}