import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsDefined, IsNotEmpty, Length, NotEquals, ValidateIf, ValidationArguments } from 'class-validator';

export class RegisterByUsernameBodyRequest {
  @IsAlpha()
  @NotEquals('test')
  @IsDefined()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;


  @ValidateIf((o, value) => {
    if ((o as RegisterByUsernameBodyRequest).password === value) {
      return true;
    } else {
      throw new HttpException('re entered password doesn\'t match', HttpStatus.BAD_REQUEST);
    }
  })
  reEnteredPassword: string;
}
