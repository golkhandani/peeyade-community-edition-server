import { IsDefined, IsEmail, IsNotEmpty, NotEquals } from 'class-validator';


export class LoginByEmailBodyRequest {
  @IsEmail()
  @NotEquals('test')
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}
