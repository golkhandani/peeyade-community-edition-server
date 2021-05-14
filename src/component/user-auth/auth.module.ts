import { UserModule } from '@component/user/user.module';
import { Module } from '@nestjs/common';
import { UserAuthController } from './auth.controller';
import { UserAuthService } from './auth.service';

@Module({
  imports: [
    UserModule
  ],
  controllers: [
    UserAuthController
  ],
  providers: [
    UserAuthService
  ],
})
export class UserAuthModule { };