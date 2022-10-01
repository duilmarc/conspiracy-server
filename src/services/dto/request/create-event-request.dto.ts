import { IsString } from 'class-validator';

export class CreateEventRequest {
  @IsString()
  eventName: string;

  @IsString()
  eventDate: string;

  @IsString()
  eventPlanner: string;

  @IsString()
  channel: string;
}
