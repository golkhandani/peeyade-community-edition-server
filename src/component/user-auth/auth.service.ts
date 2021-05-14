import { UserService } from '@component/user/user.service';
import { Injectable } from '@nestjs/common';
import { LoginByEmailBodyRequest } from './request/login-by-email.request';
import { LoginByGoogleBodyRequest } from './request/login-by-google.request';
import { LoginByPhoneBodyRequest } from './request/login-by-phone.request.ts';
import { LoginByUsernameBodyRequest } from './request/login-by-username.request';
import { DeviceIdentifierHeaderRequest } from './request/device-identifier.request';
import { RefreshAuthBodyRequest } from './request/refresh-auth.request';
import { RegisterByEmailAddressBodyRequest, RegisterByEmailVerificationBodyRequest, RegisterByEmailVerificationResendBodyRequest } from './request/register-by-email.request';
import { RegisterByPhoneNumberBodyRequest, RegisterByPhoneVerificationBodyRequest, RegisterByPhoneVerificationResendBodyRequest } from './request/register-by-phone.request';
import { RegisterByUsernameBodyRequest } from './request/register-by-username.request';
import { Contact } from '@model/Contact';
import { ContactType } from '@enum/ContactType';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService
  ) {

  }
  loginGuest(loginGuestBody: DeviceIdentifierHeaderRequest) {
    throw new Error('Method not implemented.');
  }
  registerByUsername(registerByUsernameBody: RegisterByUsernameBodyRequest) {
    throw new Error('Method not implemented.');
  }
  loginByUsername(loginByUsernameBody: LoginByUsernameBodyRequest) {
    throw new Error('Method not implemented.');
  }
  async registerByEmailAddress(fingerprintHeader: DeviceIdentifierHeaderRequest, registerByEmailAddressBody: RegisterByEmailAddressBodyRequest) {
    const email = registerByEmailAddressBody.email;
    const newContact = new Contact({
      type: ContactType.email,
      url: email,
      verified: false
    });
    const createdSession = await this.userService.createByBasicInfo(
      fingerprintHeader.fingerprint,
      fingerprintHeader.deviceinfo,
      newContact,
      email.split("@")[0]
    );

    return createdSession;

  }
  registerByEmailVerification(registerByEmailVerificationBody: RegisterByEmailVerificationBodyRequest) {
    throw new Error('Method not implemented.');
  }
  registerByEmailVerificationResend(registerByEmailVerificationResendBody: RegisterByEmailVerificationResendBodyRequest) {
    throw new Error('Method not implemented.');
  }
  loginByEmail(loginByEmailBody: LoginByEmailBodyRequest) {
    throw new Error('Method not implemented.');
  }
  registerByPhoneNumber(registerByPhoneNumberBody: RegisterByPhoneNumberBodyRequest) {
    throw new Error('Method not implemented.');
  }
  registerByPhoneVerification(registerByPhoneVerificationBody: RegisterByPhoneVerificationBodyRequest) {
    throw new Error('Method not implemented.');
  }
  registerByPhoneVerificationResend(registerByPhoneVerificationResendBody: RegisterByPhoneVerificationResendBodyRequest) {
    throw new Error('Method not implemented.');
  }
  loginByPhone(loginByPhoneBody: LoginByPhoneBodyRequest) {
    throw new Error('Method not implemented.');
  }
  loginByGoogle(loginByGoogleBody: LoginByGoogleBodyRequest) {
    throw new Error('Method not implemented.');
  }
  refreshAuth(refreshAuthBody: RefreshAuthBodyRequest) {
    throw new Error('Method not implemented.');
  }


}