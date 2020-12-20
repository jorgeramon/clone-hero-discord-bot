import { Message, User } from 'discord.js';

import { Emotes } from '@shared/enum/emotes.enum';
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
      await message.reply(
        `fuiste funado por mencionar al bot ${Emotes.JARMONIS_RAGE}`,
      );
      return false;
    }

    return true;
  }
}
