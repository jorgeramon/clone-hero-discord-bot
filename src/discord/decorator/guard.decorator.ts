import { GUARD_DECORATOR } from '@discord/constant/decorator';
import { IGuard } from '@discord/interface/guard.interface';
import { Type } from '@nestjs/common';

export const Guards = (...guards: Type<IGuard>[]): MethodDecorator => (
  target: Record<string, string>,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  Reflect.defineMetadata(GUARD_DECORATOR, guards, target, propertyKey);
  return descriptor;
};
