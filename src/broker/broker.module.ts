import { Module } from '@nestjs/common'
import { ClientsModule, Transport, KafkaOptions } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_SERVICE',
                useFactory: (configService: ConfigService): KafkaOptions => {

                    const kafkaHost = configService.get<string>('KAFKA_HOST')!
                    const kafkaPort = configService.get<number>('KAFKA_PORT_EXTERNAL')!

                    return {
                        transport: Transport.KAFKA,
                        options: {
                            client: {
                                clientId: 'task-service-1',
                                brokers: [`${kafkaHost}:${kafkaPort}`],
                            },
                            consumer: {
                                groupId: 'task-service-logs-consumer',
                                allowAutoTopicCreation: false,
                                readUncommitted: false,
                            },
                        },
                    }
                },
                inject: [ConfigService],
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class BrokerModule { }