import * as moment from 'moment';

import { Client, Message, User } from 'discord.js';

import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { Injectable } from '@nestjs/common';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';
import { Servers } from '@shared/enum/servers.enum';

@Injectable()
export class AdminGateway {
  @InjectClient()
  client: Client;

  @Guards(IsAdminGuard)
  @Command({
    name: 'rg',
    isAdmin: true,
    onlyFor: Servers.CHH,
    usage: '[usuario]',
    description: 'Muestra la fecha de registro de un usuario en particular.',
  })
  async rg(message: Message, args: string[]): Promise<void> {
    if (!args.length) {
      await message.channel.send(this.createResponseMessage(message.author));
    }

    const guild = await this.client.guilds.cache.first();
    const members = await guild.members.fetch({ query: args.join(' ') });

    const member = members.first();

    if (!member) {
      await message.channel.send(
        `No se encontró al usuario. Intenta un username más preciso.`,
      );
    } else {
      await message.channel.send(this.createResponseMessage(member.user));
    }
  }

  private createResponseMessage(user: User) {
    return `${user.username} fue creado el día **${moment(
      user.createdAt,
    ).format('DD [de] MMMM [del] YYYY [a las] hh:mm A')}**`;
  }
}
