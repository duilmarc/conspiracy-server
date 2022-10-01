import { ApplicationModule } from 'src/services/services.module';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

const controllers = [AppController];

@Module({
  imports: [ApplicationModule],
  controllers: [...controllers],
})
export class ApiModule {}
