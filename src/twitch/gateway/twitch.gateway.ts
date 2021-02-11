import { Client, Message } from 'discord.js';

import { Channels } from '@shared/enum/channels.enum';
import { Command } from '@discord/decorator/command.decorator';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { IUser } from '@user/interface/user.interface';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { Injectable } from '@nestjs/common';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserService } from '@user/service/user.service';

@Injectable()
export class TwitchGateway {
  @InjectClient()
  client: Client;

  constructor(
    private readonly twitchApiService: TwitchService,
    private readonly userService: UserService,
  ) {}

  @Command({
    name: 'twitch',
    usage: '[usuario de twitch]',
    description:
      'Permite registrar la cuenta de Twitch para notificar las transmisiones de esa cuenta.',
  })
  async addTwitchAccount(message: Message, args: string[]): Promise<void> {
    try {
      const user: IUser = await this.userService.findOrCreate(message.author);

      if (!args.length) {
        await message.reply(
          user.twitchAccount
            ? `tu cuenta asociada es **${user.twitchAccount}**`
            : 'no tienes una cuenta asociada todavía',
        );
        return;
      }

      if (user.twitchAccount) {
        await message.reply(
          `ya tienes asociada la cuenta de **${user.twitchAccount}**`,
        );
        return;
      }

      const twitchAccount: string = args[0].toLowerCase();
      const otherUser: IUser = await this.userService.findOneByTwitchAccount(
        twitchAccount,
      );

      if (otherUser) {
        await message.reply(
          `esa cuenta ha sido asociada por <@${otherUser.id}>`,
        );
        return;
      }

      const twitchUser: ITwitchUser | null = await this.twitchApiService.fetchUserByName(
        twitchAccount,
      );

      if (!twitchUser) {
        await message.reply(
          'no se ha encontrado la cuenta, ¿seguro que la escribiste bien?',
        );
        return;
      }

      await this.twitchApiService.createSubscription(twitchUser.id);

      await this.userService.updateTwitchAccount(
        message.author,
        twitchUser.id,
        twitchUser.login,
      );

      await message.reply(
        `tu cuenta fue registrada. Tus notificaciones apareceran en <#${Channels.STREAMS_EN_VIVO}>`,
      );
    } catch (e) {
      console.error(e);

      await message.reply(`hubo un error al registrar tu cuenta`);
    }
  }
}
