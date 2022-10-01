import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEventRequest {
  @IsString()
  eventName: string;

  @IsString()
  eventDate: string;

  @IsString()
  description: string;

  @IsString()
  shortDescription: string;

  @IsString()
  eventPlanner: string;

  @IsNumber()
  numberOfParticipants: number;
}
