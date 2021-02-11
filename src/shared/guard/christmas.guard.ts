import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { SpecialDateService } from '@shared/service/special-date.service';

@Injectable()
export class ChristmasGuard implements IGuard {
  constructor(private readonly specialDateService: SpecialDateService) {}

  async canActivate(message: Message): Promise<boolean> {
    if (this.specialDateService.isChristmas()) {
      await message.reply(
        `hoy no hay funas por ser navidad, ¿Dónde está tu espiritu navideño?`,
      );
      return false;
    }

    return true;
  }
}
