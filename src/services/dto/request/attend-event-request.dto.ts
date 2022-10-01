import { IsString } from 'class-validator';

export class AttendEventRequest {
  @IsString()
  eventId: string;

  @IsString()
  userId: string;
}
