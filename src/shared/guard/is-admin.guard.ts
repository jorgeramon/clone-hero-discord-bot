import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { Roles } from '@shared/enum/roles.enum';

@Injectable()
export class IsAdminGuard implements IGuard {
  canActivate(message: Message): boolean {
    return (
      message.member.roles.cache.has(Roles.ADMIN) ||
      message.member.roles.cache.has(Roles.MOD) ||
      message.member.roles.cache.has(Roles.BOT)
    );
  }
}
