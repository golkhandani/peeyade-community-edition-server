import { ObjectId } from "mongodb";

export type GrantedUser = {
  user: ObjectId,
  session: ObjectId,
  device: string;
}