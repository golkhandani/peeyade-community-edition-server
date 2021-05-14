import { ApiProperty } from '@nestjs/swagger';
import { NotEquals, IsDefined, IsNotEmpty, IsAlphanumeric, IsEnum } from 'class-validator';


export enum DevicePlatform {
  android = "android",
  ios = "ios",
  web = "web"
}

export class LoginByGoogleBodyRequest {
  @IsAlphanumeric()
  @NotEquals('test')
  @IsDefined()
  gat: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEnum(DevicePlatform)
  dp: DevicePlatform;
}
