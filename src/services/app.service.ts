import { Injectable } from '@nestjs/common';

import { CreateEventRequest } from './dto/request/create-event-request.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createEvent(createPostRequest: CreateEventRequest): string {
    console.log(createPostRequest);
    return 'Hello World!';
  }
}
