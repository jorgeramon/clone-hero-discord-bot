import { ClientEvents, Message } from 'discord.js';

import { DiscordGuard } from 'discord-nestjs';
import { SpecialDateService } from '@shared/service/special-date.service';

export class LupitaGuard implements DiscordGuard {
  private readonly specialDateService = new SpecialDateService();

  async canActive(event: keyof ClientEvents, context: any[]): Promise<boolean> {
    const message: Message = context[0];

    if (this.specialDateService.isLupitaDay()) {
      await message.reply(
        'hoy no hay funas por el día de la lupita 🙏, ¿Ya fuiste a misa?',
      );
      return false;
    }

    return true;
  }
}
