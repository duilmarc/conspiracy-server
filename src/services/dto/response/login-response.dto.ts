import { IsString } from 'class-validator';

export class LoginResponse {
  @IsString()
  id: string;

  @IsString()
  fullName: string;
}
