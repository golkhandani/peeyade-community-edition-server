import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class RefreshAuthBodyRequest {
  @IsNotEmpty()
  @IsDefined()
  refreshToken: string;

  @IsNotEmpty()
  @IsDefined()
  accessToken: string;

  @IsNotEmpty()
  @IsDefined()
  tokenType: string;

  @IsNotEmpty()
  @IsDefined()
  session: string;
}
