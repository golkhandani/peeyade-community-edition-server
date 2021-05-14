import { HttpException, HttpStatus } from '@nestjs/common';
import { IsDefined, IsNotEmpty, IsPhoneNumber, Matches, NotEquals, ValidateIf } from 'class-validator';


export class LoginByPhoneBodyRequest {
  @IsPhoneNumber('IR')
  @Matches(/^[0-9]{10,13}$/)
  @IsDefined()
  phone: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}

