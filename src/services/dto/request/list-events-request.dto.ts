import {
  IsDate,
  IsString,
} from 'class-validator';

export class ListEventRequest {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  channel: string;
}
