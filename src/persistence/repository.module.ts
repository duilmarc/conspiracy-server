import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { EventRepository } from './repositories/event.repository';

const services = [EventRepository, PrismaService];
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class RepositoryModule {}
