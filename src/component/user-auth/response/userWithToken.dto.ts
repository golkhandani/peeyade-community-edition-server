import { ApiProperty } from '@nestjs/swagger';
export class OAuth2Response {
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  tokenType: string;
}

export class UserWithTokenResponse {
  user: any;
  oAuth2: OAuth2Response;
}
