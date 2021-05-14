import { DeviceInfo } from '@component/user/model/user';
import { Expose, Transform } from 'class-transformer';
import { IsAlphanumeric, NotEquals, IsDefined, IsOptional } from 'class-validator';

export class DeviceIdentifierHeaderRequest {
  @IsAlphanumeric()
  @IsDefined()
  @Expose()
  fingerprint: string;

  @IsOptional()
  @Transform(({ value }) => {
    return value;
  })
  @Expose()
  deviceinfo?: DeviceInfo
}
