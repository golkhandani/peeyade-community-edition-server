import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ObjectId } from "mongodb";
import * as jwt from "jsonwebtoken";
import { jwtAccessTokenSecret } from "@common/constant";
import { JwtPayload } from "@component/user-auth/model/jwt-payload.model";
import * as moment from "moment";
import { plainToClass } from "class-transformer";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserService } from "@component/user/user.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private eventEmitter: EventEmitter2
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const fingerprint = request.headers["fingerprint"];
        const token = (request.headers["authorization"] || "").split(" ")[1];
        if (!token) {
            throw new UnauthorizedException([
                "authorization should not be empty..."
            ]);
        }

        const jwtPayload: JwtPayload = jwt.verify(token, jwtAccessTokenSecret) as unknown as JwtPayload;

        // !Uncomment for production
        /*
        if (moment().isAfter(jwtPayload.exp)) {
            throw new UnauthorizedException([
                "authorization has been expired..."
            ]);
        }
        */
        if (fingerprint != jwtPayload.fingerprint) {
            throw new UnauthorizedException([
                "fingerprint not matched..."
            ]);
        }

        const payload = plainToClass(JwtPayload, jwtPayload);

        const [user] = await this.eventEmitter.emitAsync(UserService._FindUserByJwtPayload, payload)

        request["user"] = user;

        return true;
    }

}