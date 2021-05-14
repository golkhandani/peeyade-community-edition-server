import { JwtPayload } from '@component/user-auth/model/jwt-payload.model';
import { Contact } from '@model/Contact';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ObjectId } from 'bson';
import { ValidationError } from 'class-validator';
import * as moment from 'moment';
import { DeviceInfo, TokenInfo, User, UserRegisterInfo, UserSession } from './model/user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public static _FindUserByJwtPayload = "FindUserByJwtPayload";
  @OnEvent(UserService._FindUserByJwtPayload)
  public async _FindUserByJwtPayload(payload: JwtPayload) {
    return await this.userRepository.findByJwtPayload(payload.user, payload.session, payload.fingerprint)
  }






  public async createByBasicInfo(fingerprint: string, deviceInfo?: DeviceInfo, contact?: Contact): Promise<UserSession> {



    // * account can be created by either contact or username
    const newSession = new UserSession({
      session: new ObjectId().toHexString().slice(16, 24).toUpperCase(),
      fingerprint: fingerprint,
      ...(deviceInfo && { deviceInfo: deviceInfo }),
    });
    const newUser = new User({
      ...(contact && { contacts: [contact] }),
      sessions: [newSession]
    });

    const exists = await this.userRepository.findByContact(contact.url);

    if (exists) {
      throw new BadRequestException("User with same info already exists!");
    }



    await this.userRepository.create(newUser)
    return newSession;
  }

  public async findByIdAndAddSession(user: ObjectId, fingerprint: string, deviceInfo?: DeviceInfo) {
    const newSession = new UserSession({
      session: new ObjectId().toHexString().slice(16, 24).toUpperCase(),
      fingerprint: fingerprint,
      ...(deviceInfo && { deviceInfo: deviceInfo }),
    });

    return await this.userRepository.findByIdAndAddSession(user, newSession);
  }

  public async findOneAndVerifyContact(user: ObjectId, contactUrl: string) {
    return await this.userRepository.findOneAndVerifyContact(user, contactUrl)
  }

  public async findByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    return user;
  }

  public async findByUserSession(session: string, fingerprint: string) {
    const user = await this.userRepository.findByUserSession(session, fingerprint);
    return user;
  }



  public async findAndUpdateUserSessionWithTokens(user: ObjectId, userRegisterInfo: UserRegisterInfo, session: string, tokenInfo: TokenInfo) {
    const updateUserSession: Partial<UserSession> = {
      accessToken: tokenInfo.accessToken,
      refreshToken: tokenInfo.refreshToken,
      tokenType: tokenInfo.tokenType,
      updatedAt: moment().toDate(),
    }

    return await this.userRepository.findAndUpdateSessionWithTokens(user, userRegisterInfo, session, updateUserSession);
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findByContact(email);
  }

  // public async findByEmailPasswordAndAddSession(email: string, password: string, fingerprint: string, deviceInfo: DeviceInfo) {
  //   const newSession = new UserSession({
  //     session: new ObjectId().toHexString().slice(16, 24).toUpperCase(),
  //     fingerprint: fingerprint,
  //     ...(deviceInfo && { deviceInfo: deviceInfo }),
  //   });

  //   const user = await this.userRepository.findByUserSession(session, fingerprint);
  //   return user;
  // }


}