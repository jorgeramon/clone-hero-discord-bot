import { CLIENT_DECORATOR } from '@discord/constant/decorator';

export const InjectClient = (): PropertyDecorator => (
  target: Record<string, any>,
  propertyKey: string | symbol,
): void => {
  Reflect.set(target, propertyKey, null);
  Reflect.defineMetadata(CLIENT_DECORATOR, {}, target, propertyKey);
};
