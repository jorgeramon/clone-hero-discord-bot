import { ClientEvents, Message } from 'discord.js';

import { DiscordGuard } from 'discord-nestjs';
import { Emotes } from '@shared/enum/emotes.enum';
import { SpecialDateService } from '@shared/service/special-date.service';

export class ChristmasGuard implements DiscordGuard {
  private readonly specialDateService = new SpecialDateService();

  async canActive(event: keyof ClientEvents, context: any[]): Promise<boolean> {
    const message: Message = context[0];

    if (this.specialDateService.isChristmas()) {
      await message.reply(
        `hoy no hay funas por ser navidad ${Emotes.PADORUUCHH}, ¿Dónde está tu espiritu navideño ${Emotes.JARMONIS_RAGE}?`,
      );
      return false;
    }

    return true;
  }
}
