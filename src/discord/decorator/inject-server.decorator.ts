import { SERVER_DECORATOR } from '@discord/constant/decorator';

export const InjectServer = (): PropertyDecorator => (
  target: Record<string, any>,
  propertyKey: string | symbol,
): void => {
  Reflect.set(target, propertyKey, null);
  Reflect.defineMetadata(SERVER_DECORATOR, {}, target, propertyKey);
};
