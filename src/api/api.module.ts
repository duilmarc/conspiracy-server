import { Module } from '@nestjs/common';

import { ApplicationModule } from '../services/services.module';
import { AppController } from './app.controller';

const controllers = [AppController];

@Module({
  imports: [ApplicationModule],
  controllers: [...controllers],
})
export class ApiModule {}
