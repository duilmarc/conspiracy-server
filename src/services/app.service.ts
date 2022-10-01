import { Injectable } from '@nestjs/common';
import {
  Event,
  User,
} from '@prisma/client';

import { EventRepository } from '../persistence/repositories/event.repository';
import { AttendEventRequest } from './dto/request/attend-event-request.dto';
import { CreateEventRequest } from './dto/request/create-event-request.dto';
import { ListEventRequest } from './dto/request/list-events-request.dto';
import { LoginRequest } from './dto/request/login-request.dto';
import { LoginResponse } from './dto/response/login-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(createPostRequest: CreateEventRequest): Promise<Event> {
    const event = await this.eventRepository.createEvent(createPostRequest);
    return event;
  }

  async listEvents(listEventsRequest: ListEventRequest): Promise<Event[]> {
    const events = await this.eventRepository.listEvents(listEventsRequest);
    return events;
  }

  async listOwnEvents(userId: string): Promise<Event[]> {
    const events = await this.eventRepository.listEventsByUser(userId);
    return events;
  }

  async eventSubscriptions(userId: string): Promise<Event[]> {
    const events = await this.eventRepository.subscriptions(userId);
    return events;
  }

  async isAttendant(eventId: string, userId: string): Promise<boolean> {
    return await this.eventRepository.isAttendant(eventId, userId);
  }

  async listAttendees(eventId: string): Promise<User[]> {
    const users = await this.eventRepository.listAttendees(eventId);
    return users;
  }

  async attendEvent(attendEventRequest: AttendEventRequest): Promise<Event> {
    const event = await this.eventRepository.attend(attendEventRequest);
    return event;
  }

  async getScore(userId: string): Promise<{ score: number }> {
    const score = await this.eventRepository.getScore(userId);
    return { score };
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
