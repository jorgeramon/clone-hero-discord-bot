import { Message, User } from 'discord.js';
import { OnCommand, UseGuards } from 'discord-nestjs';

import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { Emotes } from '@shared/enum/emotes.enum';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { FunaService } from '@funa/service/funa.service';
import { Injectable } from '@nestjs/common';
import { LupitaGuard } from '@shared/guard/lupita.guard';

@Injectable()
export class FunaGateway {
  constructor(private readonly funaService: FunaService) {}

  @UseGuards(ChristmasGuard, LupitaGuard, BotMentionGuard, EmptyMentionGuard)
  @OnCommand({ name: 'funa' })
  async funa(message: Message): Promise<void> {
    await Promise.all(
      message.mentions.users.map((user: User) =>
        this.funaService.funa(message.author, user),
      ),
    );

    let responseMessage = message.mentions.users
      .map((user: User) => `<@${user.id}>`)
      .join(', ');

    responseMessage +=
      message.mentions.users.size > 1 ? ' han sido funados' : ' ha sido funado';

    await message.channel.send(`${responseMessage} ${Emotes.JARMONIS_RAGE}`);
  }
}
