import { Module } from '@nestjs/common';

import { RepositoryModule } from '../persistence/repository.module';
import { AppService } from './app.service';

const services = [AppService];

@Module({
  imports: [RepositoryModule],
  exports: [...services],
  providers: [...services, RepositoryModule],
})
export class ApplicationModule {}
