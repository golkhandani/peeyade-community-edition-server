import { ClassType } from '@common/helper/transform-and-validate.helper';
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const ValidatedHeader = createParamDecorator(
  async (value: ClassType<any>, ctx: ExecutionContext) => {

    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;
    false
    // Convert headers to DTO object
    const dto = plainToClass(value, headers, { excludeExtraneousValues: true });

    // Validate 
    try {
      await validateOrReject(dto);
    } catch (error) {
      throw new BadRequestException(error);
    }

    // return header dto object 
    return dto;
  },
);