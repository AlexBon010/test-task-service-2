import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { MetricsService } from '@db';
import { responseTimeTemplate } from 'src/pdf/templates/response-time';

interface MetricDataPoint {
    timestamp: number;
    value: number;
}

@Injectable()
export class ApiEventsService {
    constructor(private readonly metricsService: MetricsService) { }

    async generatePdfReport() {
        const data: MetricDataPoint[] = await this.metricsService.getMetricDataAboutEndpoint(
            'GET:/api/files/getDataInFile',
            'response_time'
        );
        const htmlContent = this.generateHtml(data);

        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        return pdfBuffer;
    }

    private generateHtml(data: MetricDataPoint[]): string {
        if (!data || data.length === 0) {
            return responseTimeTemplate(0, 0, 0, [], []);
        }

        let sum = 0;
        let maxResponseTime = data[0].value;
        let minResponseTime = data[0].value;

        data.forEach(({ value }) => {
            sum += value;
            if (value > maxResponseTime) maxResponseTime = value;
            if (value < minResponseTime) minResponseTime = value;
        });
        const avgResponseTime = sum / data.length;

        return responseTimeTemplate(avgResponseTime, maxResponseTime, minResponseTime, data.map(d => new Date(d.timestamp).toDateString()), data.map(d => Number(d.value)));
    }
}
