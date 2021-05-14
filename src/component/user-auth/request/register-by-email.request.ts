import { HttpException, HttpStatus } from '@nestjs/common';
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
  session: string;

  @IsNotEmpty()
  @IsDefined()
  code: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ValidateIf((o, value) => {
    if ((o as RegisterByEmailVerificationBodyRequest).password === value) {
      return true;
    } else {
      throw new HttpException('Re-entered password doesn\'t match', HttpStatus.BAD_REQUEST);
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
