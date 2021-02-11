import { Message, User } from 'discord.js';

import { FunaService } from '@funa/service/funa.service';
import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BotMentionGuard implements IGuard {
  constructor(private readonly funaService: FunaService) {}

  async canActivate(message: Message): Promise<boolean> {
    const isBotMentioned = message.mentions.users.some(
      (user: User) => user.bot,
    );

    if (isBotMentioned) {
      await this.funaService.funa(message.author, message.author);
      await message.reply(`fuiste funado por mencionar al bot`);
      return false;
    }

    return true;
  }
}
