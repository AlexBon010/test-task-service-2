import { Module } from '@nestjs/common';
import { ApiEventsController } from './api-events/api-events.controller';

import { RedistimeseriesModule } from 'src/db/redistimeseries/redistimeseries.module';
import { ApiEventsService } from './api-events/api-events/api-events.service';

@Module({
  imports: [RedistimeseriesModule],
  controllers: [ApiEventsController],
  providers: [ApiEventsService]
})
export class PdfModule { }
