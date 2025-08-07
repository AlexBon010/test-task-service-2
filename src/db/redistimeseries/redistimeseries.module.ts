import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'
import { ConfigService } from '@nestjs/config';
import { MetricsService } from './metrics/metrics.service';

@Module({
    imports: [
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                const host = configService.get<string>('REDIS_HOST')!
                const port = configService.get<number>('REDIS_PORT')!

                const url = `redis://${host}:${port}`

                return {
                    url,
                    type: 'single',
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [MetricsService],
    exports: [MetricsService],
})
export class RedistimeseriesModule { }
