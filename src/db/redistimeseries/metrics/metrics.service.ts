import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

type MetricKey = "response_time" | "call_count" | "error_count" | "success_rate" | "payload_size" | "latency_breach";

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);

    constructor(@InjectRedis() private readonly redis: Redis) { }

    async getMetricDataAboutEndpoint(
        endpoint: string,
        metric: MetricKey,
    ): Promise<{ timestamp: number, value: number }[]> {
        try {
            const now = new Date();
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

            const composedKey = `metrics:${endpoint}:${metric}`;
            const result = await this.redis.call(
                'TS.RANGE',
                composedKey,
                monthAgo.getTime(),
                now.getTime()
            ) as [string, string][]

            return result.map(([ts, val]: [string, string]) => ({
                timestamp: parseInt(ts),
                value: parseFloat(val)
            }));

        } catch (error) {
            this.logger.error(`Error getting metric data about endpoint ${endpoint}: ${error.message}`, error.stack);
            return [];
        }
    }

}
