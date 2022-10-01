import { RepositoryModule } from 'src/persistence/repository.module';

import { Module } from '@nestjs/common';

import { AppService } from './app.service';

const services = [AppService];

@Module({
  imports: [RepositoryModule],
  exports: [...services],
  providers: [...services, RepositoryModule],
})
export class ApplicationModule {}
