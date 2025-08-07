import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';
import { ElasticsearchDbModule } from '@db';
import { FetchingLogsController } from './fetching-logs/fetching-logs.controller';
import { FetchingLogsService } from './fetching-logs/fetching-logs/fetching-logs.service';

@Global()
@Module({
    imports: [
        ElasticsearchDbModule,
        ClientsModule.registerAsync([
            {
                name: 'LOGS_SERVICE',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: configService.get<string>('KAFKA_CLIENT_ID'),
                            brokers: [`${configService.get<string>('KAFKA_HOST')}:${configService.get<number>('KAFKA_PORT')}`],
                        },
                        consumer: {
                            groupId: configService.get<string>('KAFKA_CONSUMER_GROUP_ID')!,
                            allowAutoTopicCreation: true,
                            sessionTimeout: 30000,
                            heartbeatInterval: 3000,
                            rebalanceTimeout: 60000,
                            maxBytesPerPartition: 1048576,
                            maxWaitTimeInMs: 5000,
                        },
                        run: {
                            autoCommit: true,
                            commitInterval: 1000,
                        },
                    },
                }),
            },
        ]),
    ],
    controllers: [LogsController, FetchingLogsController],
    providers: [LogsService, FetchingLogsService],
})
export class LogsModule { }
