import { Message } from 'discord.js';

export interface IGuard {
  canActivate(message: Message): boolean | Promise<boolean>;
}
