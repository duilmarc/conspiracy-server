import {
  AttendEventRequest,
} from 'src/services/dto/request/attend-event-request.dto';
import {
  ListEventRequest,
} from 'src/services/dto/request/list-events-request.dto';

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { Event } from '@prisma/client';

import { AppService } from '../services/app.service';
import {
  CreateEventRequest,
} from '../services/dto/request/create-event-request.dto';
import { LoginRequest } from '../services/dto/request/login-request.dto';
import { LoginResponse } from '../services/dto/response/login-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequest): Promise<LoginResponse> {
    return await this.appService.login(loginRequestDto);
  }

  @Get('list')
  async listEvents(
    @Query() listEventsRequestDto: ListEventRequest,
  ): Promise<Event[]> {
    return await this.appService.listEvents(listEventsRequestDto);
  }

  @Post('attend')
  async attendEvent(@Body() attendEvent: AttendEventRequest): Promise<Event> {
    return await this.appService.attendEvent(attendEvent);
  }

  @Post('createEvent')
  async createEvent(
    @Body() createEventRequestDto: CreateEventRequest,
  ): Promise<Event> {
    return await this.appService.createEvent(createEventRequestDto);
  }

  @Get('score')
  async score(@Query() userId: string) {
    return await this.appService.getScore(userId);
  }
}
