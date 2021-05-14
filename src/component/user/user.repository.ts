import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { User, UserRegisterInfo, UserSession } from './model/user';

@Injectable()
export class UserRepository {

  constructor(
    @InjectCollection(User.name) private readonly userCollection: Collection<User>,
  ) { }

  public async create(user: User): Promise<User> {
    return (await this.userCollection.insertOne(user)).ops[0];
  }

  public async findByContact(contactUrl: string): Promise<User> {
    return await this.userCollection.findOne({ "contacts.url": contactUrl })
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userCollection.findOne({ username: username })
  }

  public async findByUserSession(session: string, fingerprint: string): Promise<User> {
    return await this.userCollection.findOne({
      "sessions.session": session,
      "sessions.fingerprint": fingerprint,
    })
  }

  public async findOneAndVerifyContact(user: ObjectId, contactUrl: string): Promise<User> {
    const updated = await this.userCollection.findOneAndUpdate(
      {
        "_id": user,
        "contacts.url": contactUrl,
      },
      {
        "$set": {
          "contacts.$.verified": true
        }
      },
    );
    return updated.value;
  }

  public async findByIdAndAddSession(userId: ObjectId, userSession: UserSession): Promise<User> {
    const updated = await this.userCollection.findOneAndUpdate(
      {
        "_id": userId,
      },
      {
        "$addToSet": {
          "sessions": userSession
        }
      },
      {
        returnOriginal: false,
        projection: {
          "sessions": { $elemMatch: { "session": userSession.session } },
        }
      }
    )

    return updated.value;
  }

  public async findAndUpdateSessionWithTokens(userId: ObjectId, userRegisterInfo: UserRegisterInfo, session: string, userSession: Partial<UserSession>): Promise<User> {
    const updated = await this.userCollection.findOneAndUpdate(
      {
        "_id": userId,
        "sessions.session": session,
      },
      {
        "$set": {
          "username": userRegisterInfo.username,
          "password": userRegisterInfo.password,
          "sessions.$.accessToken": userSession.accessToken,
          "sessions.$.refreshToken": userSession.refreshToken,
          "sessions.$.tokenType": userSession.tokenType,
          "sessions.$.updatedAt": userSession.updatedAt
        }
      },
      {
        returnOriginal: false,
        projection: {
          "sessions": { $elemMatch: { "session": session } },
        }
      }
    )
    return updated.value;
  }


  public async findByJwtPayload(user: ObjectId, session: string, fingerprint: string) {
    return await this.userCollection.findOne(
      {
        _id: user,
        "sessions.session": session,
        "sessions.fingerprint": fingerprint
      },
      {
        projection: {
          sessions: 0,
          password: 0
        }
      }
    );
  }
}