import { AppService } from 'src/services/app.service';
import {
  CreateEventRequest,
} from 'src/services/dto/request/create-event-request.dto';
import { LoginRequest } from 'src/services/dto/request/login-request.dto';
import { LoginResponse } from 'src/services/dto/response/login-response.dto';

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

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequest): Promise<LoginResponse> {
    return await this.appService.login(loginRequestDto);
  }

  @Post('createEvent')
  async createEvent(
    @Body() createEventRequestDto: CreateEventRequest,
  ): Promise<string> {
    return await this.appService.createEvent(createEventRequestDto);
  }
}
