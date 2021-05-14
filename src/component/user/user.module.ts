import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { User } from './model/user';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongoModule.forFeature([
      User.name
    ])
  ],
  controllers: [],
  providers: [
    UserRepository,
    UserService,
  ],
  exports: [
    UserService
  ]
})
export class UserModule { };