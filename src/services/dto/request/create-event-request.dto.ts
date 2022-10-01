import {
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEventRequest {
  @IsString()
  eventName: string;

  @IsDate()
  eventDate: Date;

  @IsString()
  description: string;

  @IsString()
  shortDescription: string;

  @IsString()
  eventPlanner: string;

  @IsNumber()
  numberOfParticipants: number;
}
