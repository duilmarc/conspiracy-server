import bcrypt = require('bcrypt');
import {
  AttendEventRequest,
} from 'src/services/dto/request/attend-event-request.dto';

import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  Event,
  User,
} from '@prisma/client';

import {
  CreateEventRequest,
} from '../../services/dto/request/create-event-request.dto';
import {
  ListEventRequest,
} from '../../services/dto/request/list-events-request.dto';
import { LoginRequest } from '../../services/dto/request/login-request.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: CreateEventRequest): Promise<Event> {
    return await this.prisma.event.create({
      data: {
        date: new Date(data.eventDate),
        channel: data.channel,
        name: data.eventName,
        plannerId: data.eventPlanner,
      },
    });
  }

  async listEvents(listEventsRequest: ListEventRequest) {
    const { startDate, endDate } = listEventsRequest;
    return await this.prisma.event.findMany({
      where: {
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
    });
  }

  async listEventsByUser(userId: string): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        plannerId: userId,
      },
    });
  }

  async attend(attendEventRequest: AttendEventRequest) {
    const { userId, eventId } = attendEventRequest;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.FORBIDDEN);
    }
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new HttpException('Event doesnt exist', HttpStatus.FORBIDDEN);
    }

    await this.prisma.attendance.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });
    return event;
  }

  async login(data: LoginRequest): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.userName,
      },
    });
    const validLogin = bcrypt.compare(data.password, user.password);
    if (!validLogin) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async getScore(userId: string): Promise<number> {
    const creator = await this.prisma.event.count({
      where: {
        plannerId: userId,
      },
    });
    const attender = await this.prisma.attendance.count({
      where: { userId },
    });

    const score = creator * 5 + attender;
    return score;
  }
}
