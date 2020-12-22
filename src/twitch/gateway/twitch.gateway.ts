import { Client, Message } from 'discord.js';

import { Command } from '@discord/decorator/command.decorator';
import { Emotes } from '@shared/enum/emotes.enum';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { IUser } from '@user/interface/user.interface';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { Injectable } from '@nestjs/common';
import { TwitchApiService } from '@twitch/service/twitch-api.service';
import { UserService } from '@user/service/user.service';

@Injectable()
export class TwitchGateway {
  @InjectClient()
  client: Client;

  constructor(
    private readonly twitchApiService: TwitchApiService,
    private readonly userService: UserService,
  ) {}

  @Command({ name: 'twitch' })
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
          `esa cuenta ha sido asociada por <@${otherUser.id}> ${Emotes.JARMONIS_RAGE}`,
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
        `tu cuenta fue registrada ${Emotes.JARMONIS_APPROVES}`,
      );
    } catch (e) {
      console.error(e);

      await message.reply(
        `hubo un error al registrar tu cuenta ${Emotes.FISH_DEPRESION}`,
      );
    }
  }
}
