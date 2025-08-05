import { Module } from '@nestjs/common';

import { CfgModule } from './cfg/cfg.module';
import { DbModule } from './db/db.module';
import { LogsModule } from './broker/logs/logs.module';

@Module({
  imports: [CfgModule, DbModule, LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
