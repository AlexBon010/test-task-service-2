import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

import { LogsService } from './logs.service';

@Controller("logs")
export class LogsController implements OnModuleInit {
    constructor(@Inject("LOGS_SERVICE") private readonly kafkaClient: ClientKafka, private readonly logsService: LogsService) { }

    async onModuleInit() {
        await this.kafkaClient.connect()
    }

    @EventPattern('logs')
    async handleLogs(@Payload() message: any) {
        await this.logsService.handleLogs(message)
    }
}