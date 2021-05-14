import { HttpException, HttpStatus } from "@nestjs/common";
import { IsDefined, IsNotEmpty, IsPhoneNumber, Matches, ValidateIf } from "class-validator";

export class RegisterByPhoneNumberBodyRequest {
  @IsPhoneNumber('IR')
  @Matches(/^[0-9]{10,13}$/)
  @IsDefined()
  phone: string;
}


export class RegisterByPhoneVerificationBodyRequest {
  @IsDefined()
  phone: string;

  @IsDefined()
  session: string;

  @IsNotEmpty()
  @IsDefined()
  code: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ValidateIf((o, value) => {
    if ((o as RegisterByPhoneVerificationBodyRequest).password === value) {
      return true;
    } else {
      throw new HttpException('Re-entered password doesn\'t match', HttpStatus.BAD_REQUEST);
    }
  })
  reEnteredPassword: string;
}



export class RegisterByPhoneVerificationResendBodyRequest {
  @IsDefined()
  phone: string;

  @IsDefined()
  session: string;
}