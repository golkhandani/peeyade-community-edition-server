import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { User } from './model/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectCollection(User.name) private readonly userCollection: Collection<User>,
  ) { }

  public async create(user: User): Promise<User> {
    return (await this.userCollection.insertOne(user)).ops[0];
  }

  public async findByContactOrUsername(contactUrl: string, username: string): Promise<User> {
    return this.userCollection.findOne({
      $or: [
        { "contacts.url": contactUrl },
        { "username": username }
      ]
    })
  }

}