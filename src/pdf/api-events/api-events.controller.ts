import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiEventsService } from './api-events/api-events.service';

@ApiTags('API Events')
@Controller('apiEvents')
export class ApiEventsController {
    constructor(private readonly apiEventsService: ApiEventsService) { }

    @Get()
    @Header('Content-Type', 'application/pdf')
    @ApiOperation({ summary: 'Get API response time report as PDF' })
    @ApiResponse({ status: 200, description: 'Returns PDF report with response time statistics' })
    async getApiEventsReport(): Promise<StreamableFile> {
        const buffer = await this.apiEventsService.generatePdfReport();
        const date = new Date().toISOString().split('T')[0];
        return new StreamableFile(buffer, {
            disposition: `attachment; filename="api-response-time-report-${date}.pdf"`
        });
    }
}
