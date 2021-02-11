import { Message, User } from 'discord.js';

import { FunaService } from '@funa/service/funa.service';
import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmptyMentionGuard implements IGuard {
  constructor(private readonly funaService: FunaService) {}

  async canActivate(message: Message): Promise<boolean> {
    const users = message.mentions.users.filter((user: User) => !user.bot);

    if (!users.size) {
      await this.funaService.funa(message.author, message.author);
      await message.reply(`fuiste funado por no mencionar a nadie`);
      return false;
    }

    return true;
  }
}
