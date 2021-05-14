import { UserModule } from '@component/user/user.module';
import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { UserAuthController } from './auth.controller';
import { UserAuthRepository } from './auth.repository';
import { UserAuthService } from './auth.service';
import { VerificationCode } from './model/verification-code.model';

@Module({
  imports: [
    MongoModule.forFeature([
      VerificationCode.name
    ]),
    UserModule
  ],
  controllers: [
    UserAuthController
  ],
  providers: [
    UserAuthService,
    UserAuthRepository
  ],
})
export class UserAuthModule { };