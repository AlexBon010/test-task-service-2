import { Module } from '@nestjs/common';

import { CfgModule } from './cfg/cfg.module';
import { DbModule } from '@db';
import { LogsModule } from '@messageListener';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [CfgModule, DbModule, LogsModule, PdfModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
