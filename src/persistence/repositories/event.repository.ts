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

  async validateUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.FORBIDDEN);
    }
  }

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

  async subscriptions(userId: string): Promise<Event[]> {
    await this.validateUser(userId);
    const mySubscriptions = await this.prisma.attendance.findMany({
      where: {
        userId: userId,
      },
    });

    const eventsIds = mySubscriptions.map((event) => event.id);

    return await this.prisma.event.findMany({
      where: {
        id: { in: eventsIds },
        date: {
          gte: new Date(),
        },
      },
    });
  }

  async listEvents(listEventsRequest: ListEventRequest) {
    const { startDate, endDate, channel } = listEventsRequest;
    return await this.prisma.event.findMany({
      where: {
        date: {
          lte: endDate,
          gte: startDate,
        },
        channel,
      },
    });
  }

  async listEventsByUser(userId: string): Promise<Event[]> {
    await this.validateUser(userId);

    return await this.prisma.event.findMany({
      where: {
        plannerId: userId,
      },
    });
  }

  async listAttendees(eventId: string): Promise<User[]> {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new HttpException('Event doesnt exist', HttpStatus.FORBIDDEN);
    }
    const attendances = await this.prisma.attendance.findMany({
      where: {
        eventId,
      },
    });
    const userIds = attendances.map((user) => {
      return user.id;
    });

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    return users;
  }

  async attend(attendEventRequest: AttendEventRequest) {
    const { userId, eventId } = attendEventRequest;
    await this.validateUser(userId);
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
    if (!user)
      throw new HttpException('User doesnt exist ', HttpStatus.FORBIDDEN);

    const validLogin = bcrypt.compare(data.password, user.password);
    if (!validLogin) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async getScore(userId: string): Promise<number> {
    try {
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
    } catch (e) {
      throw new HttpException(
        `Couldnt get score for ${userId}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
