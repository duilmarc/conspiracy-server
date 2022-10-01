import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import {
  Event,
  User,
} from '@prisma/client';

import { AppService } from '../services/app.service';
import {
  AttendEventRequest,
} from '../services/dto/request/attend-event-request.dto';
import {
  CreateEventRequest,
} from '../services/dto/request/create-event-request.dto';
import {
  ListEventRequest,
} from '../services/dto/request/list-events-request.dto';
import { LoginRequest } from '../services/dto/request/login-request.dto';
import { LoginResponse } from '../services/dto/response/login-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async listEvents(
    @Query() listEventsRequestDto: ListEventRequest,
  ): Promise<Event[]> {
    return await this.appService.listEvents(listEventsRequestDto);
  }

  @Get('my-events')
  async getMyEvents(@Query('userId') userId: string): Promise<Event[]> {
    return await this.appService.listOwnEvents(userId);
  }

  @Get('event-subscriptions')
  async eventSubscriptions(@Query('userId') userId: string): Promise<Event[]> {
    return await this.appService.eventSubscriptions(userId);
  }

  @Get('attendees')
  async attendees(@Query('eventId') eventId: string): Promise<User[]> {
    return await this.appService.listAttendees(eventId);
  }

  @Get('score')
  async score(@Query('userId') userId: string) {
    return await this.appService.getScore(userId);
  }

  @Post('createEvent')
  async createEvent(
    @Body() createEventRequestDto: CreateEventRequest,
  ): Promise<Event> {
    return await this.appService.createEvent(createEventRequestDto);
  }

  @Post('attend')
  async attendEvent(@Body() attendEvent: AttendEventRequest): Promise<Event> {
    return await this.appService.attendEvent(attendEvent);
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequest): Promise<LoginResponse> {
    return await this.appService.login(loginRequestDto);
  }
}
