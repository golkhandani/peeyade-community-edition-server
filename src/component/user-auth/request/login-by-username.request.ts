import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, NotEquals, IsDefined, IsNotEmpty, Length, ValidationArguments } from 'class-validator';
export class LoginByUsernameBodyRequest {
  @IsAlpha()
  @NotEquals('test')
  @IsDefined()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}
