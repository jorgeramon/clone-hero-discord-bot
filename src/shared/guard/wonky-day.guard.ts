import { Emotes } from '@shared/enum/emotes.enum';
import { IGuard } from '@discord/interface/guard.interface';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { SpecialDateService } from '@shared/service/special-date.service';
import { Users } from '@shared/enum/users.enum';

@Injectable()
export class WonkyDayGuard implements IGuard {
  constructor(private readonly specialDateService: SpecialDateService) {}

  async canActivate(message: Message): Promise<boolean> {
    if (
      this.specialDateService.isWonkyDay() &&
      message.author.id === Users.WONKY
    ) {
      await message.reply(`lo siento pero hoy no ${Emotes.KEK}`);
      return false;
    }

    return true;
  }
}
