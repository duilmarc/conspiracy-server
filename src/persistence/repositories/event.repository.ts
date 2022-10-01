import bcrypt = require('bcrypt');
import {
  CreateEventRequest,
} from 'src/services/dto/request/create-event-request.dto';
import { LoginRequest } from 'src/services/dto/request/login-request.dto';

import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  Event,
  User,
} from '@prisma/client';

import { PrismaService } from '../prisma.service';

const SALT_ROUNDS = 10;
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
}
