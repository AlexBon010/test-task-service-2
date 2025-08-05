import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';
import { ElasticsearchDbModule } from 'src/db/elasticsearch/elasticsearchDb.module';

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
                            clientId: 'logs-consumer',
                            brokers: [`${configService.get<string>('KAFKA_HOST')}:${configService.get<number>('KAFKA_PORT_EXTERNAL')}`],
                        },
                        consumer: {
                            groupId: 'logs-consumer-group',
                        },
                    },
                }),
            },
        ]),
        // ClientsModule.register([
        //     {
        //         name: 'LOGS_SERVICE',
        //         transport: Transport.KAFKA,
        //         options: {
        //             client: {
        //                 clientId: 'logs-consumer',
        //                 brokers: [`localhost:9092`],
        //             },
        //             consumer: {
        //                 groupId: 'logs-consumer-group',
        //             },
        //         },
        //     },
        // ]),
    ],
    controllers: [LogsController],
    providers: [LogsService],
})
export class LogsModule { }
