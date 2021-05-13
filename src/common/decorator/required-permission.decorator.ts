import { SetMetadata } from '@nestjs/common';
import { AuthorizationGuardKey } from '@common/constant';

export const RequiredPermission = (...Permissions: string[]) => SetMetadata(AuthorizationGuardKey, Permissions);