import { EventRepository } from 'src/persistence/repositories/event.repository';

import { Injectable } from '@nestjs/common';

import { CreateEventRequest } from './dto/request/create-event-request.dto';
import { LoginRequest } from './dto/request/login-request.dto';
import { LoginResponse } from './dto/response/login-response.dto';

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

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.eventRepository.login(loginRequest);
    const response: LoginResponse = {
      fullName: user.fullName,
      id: user.id,
    };
    return response;
  }
}
