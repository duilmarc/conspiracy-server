import { EventRepository } from 'src/persistence/repositories/event.repository';

import { Injectable } from '@nestjs/common';

import { CreateEventRequest } from './dto/request/create-event-request.dto';

@Injectable()
export class AppService {
  constructor(private readonly eventRepository: EventRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createEvent(createPostRequest: CreateEventRequest): Promise<string> {
    await this.eventRepository.createEvent(createPostRequest);
    return 'Hello World!';
  }
}
