import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { FindVerificationCode } from './dto/find-verification-code.dto';
import { VerificationCode } from './model/verification-code.model';

@Injectable()
export class UserAuthRepository {
  constructor(
    @InjectCollection(VerificationCode.name) private readonly verificationCodeCollection: Collection<VerificationCode>,
  ) { }

  async create(verificationCode: VerificationCode): Promise<VerificationCode> {
    return (await this.verificationCodeCollection.insertOne(verificationCode)).ops[0];
  }

  async findVerificationCode(findVerificationCode: FindVerificationCode): Promise<VerificationCode> {
    return await this.verificationCodeCollection.findOne({
      ...findVerificationCode
    })
  }

  async deleteVerificationCode(findVerificationCode: FindVerificationCode): Promise<VerificationCode> {
    const deleted = await this.verificationCodeCollection.findOneAndDelete({
      ...findVerificationCode
    })
    return deleted.value;
  }

}