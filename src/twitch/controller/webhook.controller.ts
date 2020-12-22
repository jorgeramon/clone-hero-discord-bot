import { Body, Controller, Post } from '@nestjs/common';
import { Channels } from '@shared/enum/channels.enum';
import { TwitchGames } from '@shared/enum/twitch-games.enum';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { ITwitchNotification } from '@twitch/interface/twitch-notification.interface';
import { ITwitchStream } from '@twitch/interface/twitch-stream.interface';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { ITwitchVerification } from '@twitch/interface/twitch-verification.interface';
import { TwitchApiService } from '@twitch/service/twitch-api.service';
import { IUser } from '@user/interface/user.interface';
import { UserService } from '@user/service/user.service';
import { MessageEmbed } from 'discord.js';

@Controller('/twitch/webhook')
export class WebhookController {
  constructor(
    private readonly twitchGateway: TwitchGateway,
    private readonly twitchApiService: TwitchApiService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async notification(
    @Body() data: ITwitchNotification | ITwitchVerification,
  ): Promise<string> {
    console.log('> Twitch notification', JSON.stringify(data, null, 2));

    const notification = data as ITwitchNotification;
    const verification = data as ITwitchVerification;

    if (verification.challenge) {
      return verification.challenge;
    }

    const client = this.twitchGateway.client;
    const channel = await client.channels.fetch(Channels.STREAMS_EN_VIVO);

    const { event } = notification;

    const twitchStream: ITwitchStream = await this.twitchApiService.fetchStreamByUser(
      event.broadcaster_user_id,
    );

    if (twitchStream.game_id !== TwitchGames.CLONE_HERO) {
      return 'Ok';
    }

    const twitchUser: ITwitchUser = await this.twitchApiService.fetchUserById(
      event.broadcaster_user_id,
    );

    const user: IUser = await this.userService.findOneByTwitchAccount(
      twitchUser.login,
    );

    const thumbnail = twitchStream.thumbnail_url
      .replace('{width}', '500')
      .replace('{height}', '280');

    const message = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(twitchStream.title)
      .setDescription(
        `<@${user.id}> está transmitiendo en vivo. ¡Preparen sus raids!`,
      )
      .setAuthor(
        `${twitchUser.display_name} ha comenzado una transmisión en Twitch`,
        twitchUser.profile_image_url,
      )
      .setImage(thumbnail)
      .setFooter('Twitch Notification Bot')
      .setURL(`https://www.twitch.tv/${twitchUser.login}`);

    await (channel as any).send(message);

    return 'Ok';
  }
}
