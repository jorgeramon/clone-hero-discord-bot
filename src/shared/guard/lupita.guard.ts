import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { SpecialDateService } from '@shared/service/special-date.service';

@Injectable()
export class LupitaGuard implements IGuard {
  constructor(private readonly specialDateService: SpecialDateService) {}

  async canActivate(message: Message): Promise<boolean> {
    if (this.specialDateService.isLupitaDay()) {
      await message.reply(
        'hoy no hay funas por el día de la lupita 🙏, ¿Ya fuiste a misa?',
      );
      return false;
    }

    return true;
  }
}
