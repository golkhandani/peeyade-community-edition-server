import { Gender } from "@enum/Gender";
import { UserType } from "@enum/UserType";
import { defaultDpi, DPI, Media } from "@model/Media";
import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ObjectId } from "bson";
import { Request } from "express";


export interface UserInRequest {
  _id: ObjectId;
  birthDate: Date;
  gender: Gender;
  name: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  __v: number;
  dpi: DPI;
}


export const UserInReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInRequest => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request["user"]) {
      throw new UnauthorizedException();
    }
    return { ...request["user"], dpi: request.headers["x-dpi"] || defaultDpi };
  },
);