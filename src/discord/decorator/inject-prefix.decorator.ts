import { PREFIX_DECORATOR } from '@discord/constant/decorator';

export const InjectPrefix = (): PropertyDecorator => (
  target: Record<string, any>,
  propertyKey: string | symbol,
): void => {
  Reflect.set(target, propertyKey, null);
  Reflect.defineMetadata(PREFIX_DECORATOR, {}, target, propertyKey);
};
