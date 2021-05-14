import { ObjectId } from "mongodb";

export class VerificationCode {
  _id: ObjectId
  session: string;
  identifier: string;
  fingerprint: string;
  code: string;
  expireAt: Date;
  createAt: Date;

  constructor(data: Omit<VerificationCode, "_id">) {
    return Object.assign(this, data);
  }

}