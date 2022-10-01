import { Module } from '@nestjs/common';

import { AppService } from './app.service';

const services = [AppService];

@Module({
  exports: [...services],
  providers: [...services],
})
export class ApplicationModule {}
