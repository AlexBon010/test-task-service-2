import { Module } from '@nestjs/common';

import { CfgModule } from './cfg/cfg.module';
import { DbModule } from './db/db.module';
import { BrokerModule } from './broker/broker.module';

@Module({
  imports: [CfgModule, DbModule, BrokerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
