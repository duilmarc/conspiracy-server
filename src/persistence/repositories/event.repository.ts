import {
  CreateEventRequest,
} from 'src/services/dto/request/create-event-request.dto';

import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: CreateEventRequest): Promise<Event> {
    return await this.prisma.event.create({
      data: {
        date: new Date(data.eventDate),
        description: data.description,
        numberOfParticipants: data.numberOfParticipants,
        shortDescription: data.shortDescription,
        name: data.eventName,
        plannerId: data.eventPlanner,
      },
    });
  }
}
