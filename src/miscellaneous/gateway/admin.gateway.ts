import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Servers } from '@shared/enum/servers.enum';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';
import { Client, Message, User } from 'discord.js';
import * as moment from 'moment';

@Injectable()
export class AdminGateway {
  @InjectClient()
  client: Client;

  constructor(private readonly configService: ConfigService) {}

  @Guards(IsAdminGuard)
  @Command({
    name: 'gmail',
    isAdmin: true,
    onlyFor: Servers.PHC,
    description:
      'Muestra los datos de la cuenta Gmail de Plastic Hero Community',
  })
  async gmail(message: Message): Promise<void> {
    const email = this.configService.get('PHC_MAIL');
    const password = this.configService.get('PHC_PASSWORD');

    await message.channel.send([
      `Correo: **${email}**`,
      `Contraseña: **${password}**`,
    ]);
  }

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
