import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';
import { default as autoTable } from 'jspdf-autotable';

import { createCanvas } from 'canvas';

import { MetricsService } from '@db';


interface jsPDFWithPlugin extends jsPDF {
    autoTable: (options: any) => void;
}

interface MetricDataPoint {
    timestamp: number;
    value: number;
}

@Injectable()
export class ApiEventsService {
    constructor(private readonly metricsService: MetricsService) { }

    async generatePdfReport(): Promise<Buffer> {
        const data: MetricDataPoint[] = await this.metricsService.getMetricDataAboutEndpoint(
            'GET:/api/files/getDataInFile',
            'response_time'
        );

        const doc = new jsPDF() as jsPDFWithPlugin;
        doc.setFontSize(16);
        doc.text('Response Time Analysis', 20, 20);
        doc.setFontSize(12);
        doc.text('Endpoint: GET:/api/files/getDataInFile', 20, 30);

        const chartImage = this.createChartImage(data);
        doc.addImage(chartImage, 'PNG', 15, 40, 180, 100);

        this.addMetricsTable(doc, data, 150);

        return Buffer.from(doc.output('arraybuffer'));
    }

    private createChartImage(data: MetricDataPoint[]): string {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';

        ctx.fillText('Time', canvas.width / 2, canvas.height - padding / 3);

        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Response Time (ms)', 0, 0);
        ctx.restore();

        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.map(d => d.value).forEach((val, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            const y = canvas.height - padding - (val / Math.max(...data.map(d => d.value))) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        return canvas.toDataURL('image/png');
    }

    private addMetricsTable(doc: jsPDFWithPlugin, data: MetricDataPoint[], startY: number): void {
        if (!data || data.length === 0) {
            autoTable(doc, {
                head: [['Metric', 'Value']],
                body: [['No data available', '—']],
                startY,
                styles: { fontSize: 10 }
            });
            return;
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

        autoTable(doc, {
            head: [['Metric', 'Value (ms)']],
            body: [
                ['Average Response Time', avgResponseTime.toFixed(2)],
                ['Maximum Response Time', maxResponseTime.toFixed(2)],
                ['Minimum Response Time', minResponseTime.toFixed(2)]
            ],
            startY,
            styles: { fontSize: 10 }
        });
    }
}

