import { Module } from '@nestjs/common';

import { CfgModule } from './cfg/cfg.module';
import { DbModule } from '@db';
import { LogsModule } from '@messageListener';

@Module({
  imports: [CfgModule, DbModule, LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
