import { Client, Message } from 'discord.js';

import { Command } from '@discord/decorator/command.decorator';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { IUser } from '@user/interface/user.interface';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { InjectPrefix } from '@discord/decorator/inject-prefix.decorator';
import { Injectable } from '@nestjs/common';
import { StreamService } from '@shared/service/stream.service';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserService } from '@user/service/user.service';

@Injectable()
export class TwitchGateway {
  @InjectClient()
  client: Client;

  @InjectPrefix()
  prefix: string;

  constructor(
    private readonly twitchService: TwitchService,
    private readonly userService: UserService,
    private readonly streamService: StreamService,
  ) {}

  @Command({
    name: 'untwitch',
    description: 'Elimina el bot de las notificaciones de tu canal',
  })
  async removeTwitchAccount(message: Message): Promise<void> {
    try {
      const user: IUser = await this.userService.findOrCreate(message.author);
      const subscriptions = await this.twitchService.fetchCurrentSubscriptions();

      const subscription = subscriptions.find(
        (subscription) =>
          subscription.condition.broadcaster_user_id === user.twitchId,
      );

      if (!subscription) {
        await message.reply('no tienes notificaciones activas de tu canal');
      } else {
        await this.twitchService.deleteSubscription(subscription.id);
        await this.userService.updateTwitchAccount(message.author, null, null);
        await message.reply('el canal fue eliminado de las notificaciones');
      }
    } catch (e) {
      console.error(e);
      await message.reply('hubo un error al intentar eliminar tu canal');
    }
  }

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
            ? `tu cuenta asociada es **${user.twitchAccount}**. Si quieres cambiar de cuenta utiliza el comando \`${this.prefix}untwitch\` y luego \`${this.prefix}twitch\` con tu nuevo usuario.`
            : 'no tienes una cuenta asociada todavía',
        );
        return;
      }

      if (user.twitchAccount) {
        await message.reply(
          `ya tienes la cuenta asociada **${user.twitchAccount}**. Si quieres cambiar de cuenta utiliza el comando \`${this.prefix}untwitch\` y luego \`${this.prefix}twitch\` con tu nuevo usuario.`,
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

      const twitchUser: ITwitchUser | null = await this.twitchService.fetchUserByName(
        twitchAccount,
      );

      if (!twitchUser) {
        await message.reply(
          'no se ha encontrado la cuenta, ¿seguro que la escribiste bien?',
        );
        return;
      }

      await this.twitchService.createSubscription(twitchUser.id);

      await this.userService.updateTwitchAccount(
        message.author,
        twitchUser.id,
        twitchUser.login,
      );

      const channelsMessage = this.streamService
        .getTwitchChannels()
        .map((channelId) => `<#${channelId}>`)
        .join(', ');

      await message.reply(
        `tu cuenta fue registrada. Tus notificaciones apareceran en ${channelsMessage}.`,
      );
    } catch (e) {
      console.error(e);

      await message.reply(`hubo un error al registrar tu cuenta`);
    }
  }
}
