import { Controller, Get, Post, Headers, Body } from '@nestjs/common';
import { UserAuthService } from './auth.service';
import { LoginByEmailBodyRequest } from './request/login-by-email.request';
import { LoginByGoogleBodyRequest } from './request/login-by-google.request';
import { LoginByPhoneBodyRequest } from './request/login-by-phone.request.ts';
import { LoginByUsernameBodyRequest } from './request/login-by-username.request';
import { DeviceIdentifierHeaderRequest } from './request/device-identifier.request';
import { RefreshAuthBodyRequest } from './request/refresh-auth.request';
import { RegisterByEmailAddressBodyRequest, RegisterByEmailVerificationBodyRequest, RegisterByEmailVerificationResendBodyRequest } from './request/register-by-email.request';
import { RegisterByPhoneNumberBodyRequest, RegisterByPhoneVerificationBodyRequest, RegisterByPhoneVerificationResendBodyRequest } from './request/register-by-phone.request';
import { RegisterByUsernameBodyRequest } from './request/register-by-username.request';
import { ValidatedHeader } from '@common/decorator/validated-header.decorator';

@Controller(UserAuthController.path)
export class UserAuthController {
  public static path: string = 'users/auth';
  constructor(
    private readonly userAuthService: UserAuthService
  ) { }

  @Post('login/guest')
  async loginGuest(
    @Headers() deviceIdentifierHeader: DeviceIdentifierHeaderRequest
  ) {
    return await this.userAuthService.loginGuest(deviceIdentifierHeader);
  }

  @Post('register/username')
  async registerByUsername(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByUsernameBody: RegisterByUsernameBodyRequest
  ) {
    return await this.userAuthService.registerByUsername(registerByUsernameBody);
  }

  @Post('login/username')
  async loginByUsername(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() loginByUsernameBody: LoginByUsernameBodyRequest,
  ) {
    return await this.userAuthService.loginByUsername(loginByUsernameBody);
  }




  @Post('register/email/address')
  async registerByEmailAddress(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByEmailAddressBody: RegisterByEmailAddressBodyRequest
  ) {
    return await this.userAuthService
      .registerByEmailAddress(
        deviceIdentifierHeader,
        registerByEmailAddressBody,
      );
  }

  @Post('register/email/verification')
  async registerByEmailVerification(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByEmailVerificationBody: RegisterByEmailVerificationBodyRequest
  ) {
    return await this.userAuthService
      .registerByEmailVerification(
        deviceIdentifierHeader,
        registerByEmailVerificationBody
      );
  }

  @Post('register/email/verification/resend')
  async registerByEmailVerificationResend(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByEmailVerificationResendBody: RegisterByEmailVerificationResendBodyRequest,
  ) {
    return await this.userAuthService.registerByEmailVerificationResend(registerByEmailVerificationResendBody)
  }

  @Post('login/email')
  async loginByEmail(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() loginByEmailBody: LoginByEmailBodyRequest,
  ) {
    return await this.userAuthService.loginByEmail(deviceIdentifierHeader, loginByEmailBody);
  }




  @Post('register/phone/number')
  async registerByPhoneNumber(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByPhoneNumberBody: RegisterByPhoneNumberBodyRequest
  ) {
    return await this.userAuthService.registerByPhoneNumber(registerByPhoneNumberBody);
  }

  @Post('register/phone/verification')
  async registerByPhoneVerification(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByPhoneVerificationBody: RegisterByPhoneVerificationBodyRequest
  ) {
    return await this.userAuthService.registerByPhoneVerification(registerByPhoneVerificationBody);
  }

  @Post('register/phone/verification/resend')
  async registerByPhoneVerificationResend(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() registerByPhoneVerificationResendBody: RegisterByPhoneVerificationResendBodyRequest,
  ) {
    return await this.userAuthService.registerByPhoneVerificationResend(registerByPhoneVerificationResendBody)
  }

  @Post('login/phone')
  async loginByPhone(
    @Body() loginByPhoneBody: LoginByPhoneBodyRequest,
  ) {
    return await this.userAuthService.loginByPhone(loginByPhoneBody);
  }

  @Post('login/google')
  async loginByGoogle(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() loginByGoogleBody: LoginByGoogleBodyRequest,
  ) {
    return await this.userAuthService.loginByGoogle(loginByGoogleBody);
  }

  @Post('refresh')
  async refreshAuth(
    @ValidatedHeader(DeviceIdentifierHeaderRequest)
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    @Body() refreshAuthBody: RefreshAuthBodyRequest
  ) {
    return await this.userAuthService.refreshAuth(refreshAuthBody);
  }
}