import { toObjectId } from "@common/transformer/to-objectId.transformer";
import { Exclude, Expose, Transform } from "class-transformer";
import { ObjectId } from "mongodb";

@Exclude()
export class JwtPayload {
  sub?: string;
  @Expose()
  @Transform(toObjectId)
  user: ObjectId;
  @Expose()
  session: string;
  @Expose()
  fingerprint: string;
  iat?: number;
  exp?: number;
  jti?: string;
  iss?: string;
  aud?: string;

  constructor(data: JwtPayload) {
    return Object.assign(this, data);
  }
}

/**
 return this.jwtService.sign(payload, {
            subject: TokenSubject.lock(payload),
            algorithm: jwtLockConstants.algorithm,
            issuer: jwtLockConstants.issuer,
            audience: jwtLockConstants.audience,
            expiresIn: jwtLockConstants.expiresIn,
        });
 */