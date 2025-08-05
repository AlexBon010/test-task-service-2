import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject("KAFKA_SERVICE")
        private readonly kafkaClient: ClientKafka,
    ) { }

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf("logs")
        await this.kafkaClient.connect()
    }

    async onModuleDestroy() {
        await this.kafkaClient.close()
    }

    // Method for handling incoming logs
    handleLogs(message: any) {
        // TODO: Implement your log handling logic here
        console.log('Received log message:', message)
    }
}