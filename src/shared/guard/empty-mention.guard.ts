import { ClientEvents, Message, User } from 'discord.js';

import { DiscordGuard } from 'discord-nestjs';
import { Emotes } from '@shared/enum/emotes.enum';
import { ReactiveFunaService } from '@shared/service/reactive-funa.service';

export class EmptyMentionGuard implements DiscordGuard {
  async canActive(event: keyof ClientEvents, context: any[]): Promise<boolean> {
    const message: Message = context[0];

    const users = message.mentions.users.filter((user: User) => !user.bot);

    const reactiveFunaService = ReactiveFunaService.getInstance();

    if (!users.size) {
      reactiveFunaService.next(message.author, message.author);
      await message.reply(
        `fuiste funado por no mencionar a nadie ${Emotes.JARMONIS_RAGE}`,
      );
      return false;
    }

    return true;
  }
}
