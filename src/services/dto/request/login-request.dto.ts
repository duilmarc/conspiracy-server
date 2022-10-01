import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
