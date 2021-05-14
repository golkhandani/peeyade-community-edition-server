import { Contact } from '@model/Contact';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { ValidationError } from 'class-validator';
import { DeviceInfo, User, UserSession } from './model/user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public async createByBasicInfo(fingerprint: string, deviceInfo?: DeviceInfo, contact?: Contact, username?: string): Promise<UserSession> {



    // * account can be created by either contact or username
    const newSession = new UserSession({
      session: new ObjectId().toHexString().slice(0, 6).toUpperCase(),
      fingerprint: fingerprint,
      ...(deviceInfo && { deviceInfo: deviceInfo }),
    });
    const newUser = new User({
      ...(contact && { contacts: [contact] }),
      ...(username && { username: username }),
      sessions: [newSession]
    })

    const exists = await this.userRepository.findByContactOrUsername(contact.url, newUser.username)
    console.log(exists);

    if (exists) {
      throw new BadRequestException("User with same info already exists!")
    }



    await this.userRepository.create(newUser)
    return newSession;
  }

}