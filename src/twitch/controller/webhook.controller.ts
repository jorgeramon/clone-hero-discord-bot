import { Body, Controller, Post } from '@nestjs/common';
import { StreamService } from '@shared/service/stream.service';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { ITwitchNotification } from '@twitch/interface/twitch-notification.interface';
import { ITwitchStream } from '@twitch/interface/twitch-stream.interface';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { ITwitchVerification } from '@twitch/interface/twitch-verification.interface';
import { TwitchService } from '@twitch/service/twitch.service';
import { IUser } from '@user/interface/user.interface';
import { UserService } from '@user/service/user.service';
import { MessageEmbed } from 'discord.js';
import { v4 } from 'uuid';

@Controller('twitch/webhook')
export class WebhookController {
  constructor(
    private readonly twitchGateway: TwitchGateway,
    private readonly twitchService: TwitchService,
    private readonly userService: UserService,
    private readonly streamService: StreamService,
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

    const { client } = this.twitchGateway;
    const { event } = notification;

    const twitchStream: ITwitchStream = await this.twitchService.fetchStreamByUser(
      event.broadcaster_user_id,
    );

    const channelId = this.streamService.getChannelByGame(twitchStream.game_id);

    if (!channelId) {
      return 'Ok';
    }

    const channel = await client.channels.fetch(channelId);

    const twitchUser: ITwitchUser = await this.twitchService.fetchUserById(
      event.broadcaster_user_id,
    );

    const user: IUser = await this.userService.findOneByTwitchAccount(
      twitchUser.login,
    );

    const thumbnail = `${twitchStream.thumbnail_url
      .replace('{width}', '500')
      .replace('{height}', '280')}?uuid=${v4()}`;

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
      .setThumbnail(
        'https://www.awesomescreenshot.com/image/1289541/5837859-1f876f4f0b05a73268783723ad4d1551.png',
      )
      .setImage(thumbnail)
      .setFooter('Twitch Notification Bot')
      .setURL(`https://www.twitch.tv/${twitchUser.login}`);

    await (channel as any).send(message);

    return 'Ok';
  }
}
