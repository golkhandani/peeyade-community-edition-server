import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ObjectId } from "mongodb";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers["authorization"];
        // if (!token) {
        //     throw new UnauthorizedException();
        // }


        const user = {
            "_id": new ObjectId("596bce87a73007293b781d78"),
            "birthDate": new Date("1996-07-05T19:30:00.000Z"),
            "gender": "male",
            "name": "معین رضاعلیزاده@mooeeiiin",
            "type": "user",
            "createdAt": new Date("2019-01-16T02:06:41.761Z"),
            "updatedAt": new Date("2020-02-18T11:28:27.309Z"),
            "deletedAt": null,
            "__v": 0
        }
        request["user"] = user;

        return true;
    }

}