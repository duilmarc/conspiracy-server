import { IsDate } from 'class-validator';

export class ListEventRequest {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
