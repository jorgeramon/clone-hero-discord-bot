import { COMMAND_DECORATOR } from '@discord/constant/decorator';

export type CommandOptions = {
  name: string;
  action?: string;
  actions?: string[];
};

export const Command = (options: CommandOptions): MethodDecorator => (
  target: Record<string, string>,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  Reflect.defineMetadata(COMMAND_DECORATOR, options, target, propertyKey);
  return descriptor;
};
