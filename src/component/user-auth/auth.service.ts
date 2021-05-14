import { UserService } from '@component/user/user.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { CreatedSession } from './response/created-session.response';
import { JwtPayload } from './model/jwt-payload.model';
import { UserAuthRepository } from './auth.repository';
import { VerificationCode } from './model/verification-code.model';
import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from '@common/constant';



@Injectable()
export class UserAuthService {
  constructor(
    private readonly userAuthRepository: UserAuthRepository,
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



  public async registerByEmailAddress(
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    registerByEmailAddressBody: RegisterByEmailAddressBodyRequest
  ): Promise<CreatedSession | any> {

    // create new Contact way based on input data
    // create a new user with session based on input data
    // return session to user so it can continue its path
    const email = registerByEmailAddressBody.email;
    const newContact = new Contact({
      type: ContactType.email,
      url: email,
      verified: false
    });
    const createdSession = await this.userService.createByBasicInfo(
      deviceIdentifierHeader.fingerprint,
      deviceIdentifierHeader.deviceinfo,
      newContact,
    );


    const newVerificationCode = new VerificationCode({
      code: Math.floor(Math.random() * 1000).toString(),
      createAt: moment().toDate(),
      expireAt: moment().add(15, "minutes").toDate(),
      fingerprint: deviceIdentifierHeader.fingerprint,
      identifier: newContact.url,
      session: createdSession.session
    })
    const createdVerification = await this.userAuthRepository.create(newVerificationCode)

    return {
      createdVerification,
      session: createdSession.session
    };

  }
  public async registerByEmailVerification(
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    registerByEmailVerificationBody: RegisterByEmailVerificationBodyRequest
  ) {
    // create user tokens and add them to session
    // add info like password and username to user info
    // return user info and current session info to user

    // first check the username
    const checkUsername = await this.userService
      .findByUsername(
        registerByEmailVerificationBody.username
      );
    if (checkUsername) {
      throw new BadRequestException([
        "username already taken..."
      ])
    }


    // find the user based on session and fingerprint
    // which user has sent to us
    const user = await this.userService
      .findByUserSession(
        registerByEmailVerificationBody.session,
        deviceIdentifierHeader.fingerprint
      );
    if (!user) {
      throw new BadRequestException([
        "session has no exists user..."
      ])
    }


    // check the code and remove verification code record 
    // if every thing was fine
    const verificationCode = await this.userAuthRepository.findVerificationCode({
      code: registerByEmailVerificationBody.code,
      fingerprint: deviceIdentifierHeader.fingerprint,
      identifier: registerByEmailVerificationBody.email,
      session: registerByEmailVerificationBody.session
    });

    if (moment().isAfter(verificationCode.expireAt)) {
      throw new BadRequestException([
        "code has been expired..."
      ])
    }

    await this.userAuthRepository.deleteVerificationCode({
      code: registerByEmailVerificationBody.code,
      fingerprint: deviceIdentifierHeader.fingerprint,
      identifier: registerByEmailVerificationBody.email,
      session: registerByEmailVerificationBody.session
    });

    // now that username, session, and code has been checked
    // we should change contact to verified and create token

    // verify user contact
    await this.userService.findOneAndVerifyContact(
      user._id,
      registerByEmailVerificationBody.email)

    const accessTokenJwtPayload: JwtPayload = {
      sub: "access-jwt-token-peeyade-application",
      fingerprint: deviceIdentifierHeader.fingerprint,
      session: registerByEmailVerificationBody.session,
      user: user._id,
      aud: "peeyade-application",
      iss: "peeyade",
      exp: moment().add(5, "minutes").valueOf()
    }
    const accessTokenJwt = jwt.sign(accessTokenJwtPayload, "accessTokenJwtPayload");

    const refreshTokenJwtPayload: JwtPayload = {
      sub: "refresh-jwt-token-peeyade-application",
      fingerprint: deviceIdentifierHeader.fingerprint,
      session: registerByEmailVerificationBody.session,
      user: user._id,
      aud: "peeyade-application",
      iss: "peeyade",
      exp: moment().add(5, "days").valueOf()
    }

    const refreshTokenJwt = jwt.sign(refreshTokenJwtPayload, "refreshTokenJwtPayload");

    // update session with these codes
    // then send them to user with user info
    const updatedSession = await this.userService
      .findAndUpdateUserSessionWithTokens(
        user._id,
        {
          password: registerByEmailVerificationBody.password,
          username: registerByEmailVerificationBody.username
        },
        registerByEmailVerificationBody.session,
        {
          accessToken: accessTokenJwt,
          refreshToken: refreshTokenJwt,
          tokenType: "Bearer"
        }
      );

    return {
      accessTokenJwt,
      refreshTokenJwt,
      updatedSession
    }

  }


  registerByEmailVerificationResend(registerByEmailVerificationResendBody: RegisterByEmailVerificationResendBodyRequest) {
    throw new Error('Method not implemented.');
  }



  public async loginByEmail(
    deviceIdentifierHeader: DeviceIdentifierHeaderRequest,
    loginByEmailBody: LoginByEmailBodyRequest
  ) {

    const user = await this.userService.findByEmail(loginByEmailBody.email);
    if (!user || user.password != loginByEmailBody.password) {
      throw new NotFoundException([
        "user with login info does not exists"
      ])
    }

    const userWithSession = await this.userService
      .findByIdAndAddSession(
        user._id,
        deviceIdentifierHeader.fingerprint,
        deviceIdentifierHeader.deviceinfo
      );

    const accessTokenJwtPayload: JwtPayload = {
      sub: "access-jwt-token-peeyade-application",
      fingerprint: deviceIdentifierHeader.fingerprint,
      session: userWithSession.sessions[0].session,
      user: user._id,
      aud: "peeyade-application",
      iss: "peeyade",
      exp: moment().add(5, "minutes").valueOf()
    }
    const accessTokenJwt = jwt.sign(accessTokenJwtPayload, jwtAccessTokenSecret);

    const refreshTokenJwtPayload: JwtPayload = {
      sub: "refresh-jwt-token-peeyade-application",
      fingerprint: deviceIdentifierHeader.fingerprint,
      session: userWithSession.sessions[0].session,
      user: user._id,
      aud: "peeyade-application",
      iss: "peeyade",
      exp: moment().add(5, "days").valueOf()
    }

    const refreshTokenJwt = jwt.sign(refreshTokenJwtPayload, jwtRefreshTokenSecret);

    // update session with these codes
    // then send them to user with user info
    const updatedSession = await this.userService
      .findAndUpdateUserSessionWithTokens(
        user._id,
        {
          password: user.password,
          username: user.username
        },
        userWithSession.sessions[0].session,
        {
          accessToken: accessTokenJwt,
          refreshToken: refreshTokenJwt,
          tokenType: "Bearer"
        }
      );

    return {
      accessTokenJwt,
      refreshTokenJwt,
      updatedSession
    }
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