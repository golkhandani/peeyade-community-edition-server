import { Gender } from "@enum/Gender";
import { ObjectId } from "mongodb";
import { Contact } from "@model/Contact";
import { Media } from "@model/Media";
import { UserType } from "../enum/user-type";
import { UserRegistration } from "../enum/user-registration.enum";

export type DeviceInfo = Map<string, string>;


export class TokenInfo {
    refreshToken: string;

    accessToken: string;

    tokenType: string;
}

export class UserRegisterInfo {
    username: string;

    password: string;
}


export class UserSession {

    refreshToken?: string;

    accessToken?: string;

    tokenType?: string;

    session: string;

    fingerprint: string;

    deviceInfo: DeviceInfo;

    createdAt: Date;

    updatedAt: Date;

    __v: number;

    constructor(data: Partial<UserSession>) {
        if (data) {
            this.accessToken = data.accessToken || null;
            this.refreshToken = data.refreshToken || null;
            this.tokenType = data.tokenType || null;
            this.createdAt = new Date();
            this.updatedAt = new Date();
            this.__v = 1;
            return Object.assign(this, data);
        }
    }
}


export class User {
    _id: ObjectId;

    type: UserType;

    name: string;

    username: string;

    password: string;

    avatar?: Media;

    contacts: Contact[];

    gender: Gender;

    biography: string;

    birthDate: Date;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    __v: number;

    registration: UserRegistration;

    sessions: UserSession[];

    constructor(data: Partial<User>) {
        if (data) {
            this.createdAt = new Date();
            this.updatedAt = new Date();
            this.__v = 1;
            return Object.assign(this, data);
        }
    }
}
