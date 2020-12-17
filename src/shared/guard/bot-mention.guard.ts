import { ClientEvents, Message, User } from 'discord.js';

import { DiscordGuard } from 'discord-nestjs';
import { Emotes } from '@shared/enum/emotes.enum';
import { ReactiveFunaService } from '@shared/service/reactive-funa.service';

export class BotMentionGuard implements DiscordGuard {
  async canActive(event: keyof ClientEvents, context: any[]): Promise<boolean> {
    const message: Message = context[0];

    const isBotMentioned = message.mentions.users.some(
      (user: User) => user.bot,
    );

    const reactiveFunaService = ReactiveFunaService.getInstance();

    if (isBotMentioned) {
      reactiveFunaService.next(message.author, message.author);
      await message.reply(
        `fuiste funado por mencionar al bot ${Emotes.JARMONIS_RAGE}`,
      );
      return false;
    }

    return true;
  }
}
