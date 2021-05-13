import { validate, validateSync } from 'class-validator';
import { ClassConstructor, ClassTransformer, ClassTransformOptions, plainToClass } from 'class-transformer';
import { InternalServerErrorException } from '@nestjs/common';
import { config } from '@common/common.config';

export type ClassType<T> = new (...args: any[]) => T;


export function transformAndValidate<T extends Object>(targetClass: ClassType<T>, rawValue: any, params: ClassTransformOptions = config.classTransform.Options) {
  const pToC = plainToClass(targetClass, rawValue, params);
  const validationErrors = validateSync(pToC, {
    whitelist: false,
    skipNullProperties: true,
    skipUndefinedProperties: true,
    skipMissingProperties: true,
  });

  if (validationErrors[0]) {
    // ! For Now Only 2 level of handling errors
    const debug =
      validationErrors.map((validationError) => {
        const message = Object.keys(validationError.constraints || validationError.children[0]?.constraints || {})
          .map(key => validationError.constraints?.[key] || validationError.children[0]?.constraints[key])[0]
        if (message) return message;
      });

    throw new InternalServerErrorException(
      { message: debug, status: 500, error: "Internal server error" }
    );
  } else {
    return pToC;
  }
}

export function TransformAndValidate(
  classType: ClassConstructor<any>,
  params: ClassTransformOptions = config.classTransform.Options
): MethodDecorator {
  return function (target: Record<string, any>, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void {
    const classTransformer: ClassTransformer = new ClassTransformer();
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): Record<string, any> {
      const result: any = originalMethod.apply(this, args);

      const isPromise =
        !!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function';
      return isPromise
        ? result.then((data: any) => {
          const validatedData = transformAndValidate(classType, data, params);
          return validatedData;
        })
        : transformAndValidate(classType, result, params);
    };
  };
}