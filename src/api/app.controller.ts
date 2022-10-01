import { AppService } from 'src/services/app.service';
import {
  CreateEventRequest,
} from 'src/services/dto/request/create-event-request.dto';

import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('createEvent')
  createEvent(@Body() createEventRequestDto: CreateEventRequest): string {
    return this.appService.createEvent(createEventRequestDto);
  }
}
