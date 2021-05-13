import { Gender } from "@enum/Gender";
import { UserType } from "@enum/UserType";
import { ObjectId } from "mongodb";
import { Contact } from "./Contact";
import { Media } from "./Media";






export class User {
    _id: ObjectId;

    type: UserType;

    name: string;

    avatar?: Media;

    contacts: Contact[];

    gender: Gender;

    biography: string;

    birthDate: Date;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    __v: number;
    constructor(data: User) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
