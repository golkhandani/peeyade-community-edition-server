import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { IsDefined, IsEmail, IsNotEmpty, NotEquals, ValidateIf } from 'class-validator';

export class RegisterByEmailAddressBodyRequest {
  @IsEmail()
  @NotEquals('test')
  @IsDefined()
  email: string;

}

export class RegisterByEmailVerificationBodyRequest {

  @IsDefined()
  email: string;

  @IsDefined()
  username: string;

  @IsDefined()
  session: string;

  @IsNotEmpty()
  @IsDefined()
  code: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsDefined()
  @ValidateIf((o, value) => {
    if ((o as RegisterByEmailVerificationBodyRequest).password === value) {
      return true;
    } else {
      throw new BadRequestException([
        'reEnteredPassword Re-entered password doesn\'t match'
      ]);
    }
  })
  reEnteredPassword: string;
}


export class RegisterByEmailVerificationResendBodyRequest {

  @IsDefined()
  email: string;

  @IsDefined()
  session: string;
}
