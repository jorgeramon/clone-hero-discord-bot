import { EnvironmentService } from '@shared/service/environment.service';
import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class IsAdminGuard implements IGuard {
  constructor(private readonly environmentService: EnvironmentService) {}

  canActivate(message: Message): boolean {
    const { roles } = this.environmentService;

    return (
      message.member.roles.cache.has(roles.ADMIN) ||
      message.member.roles.cache.has(roles.MOD) ||
      message.member.roles.cache.has(roles.BOT)
    );
  }
}
