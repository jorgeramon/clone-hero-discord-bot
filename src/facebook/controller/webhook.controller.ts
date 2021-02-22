import { FacebookGateway } from '@facebook/gateway/facebook.gateway';
import { FacebookNotification } from '@facebook/interface/facebook-notification.interface';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { StreamService } from '@shared/service/stream.service';
import { MessageEmbed, User } from 'discord.js';
import { v4 } from 'uuid';

@Controller('facebook/webhook')
export class WebhookController {
  constructor(
    private readonly facebookGateway: FacebookGateway,
    private readonly streamService: StreamService,
  ) {}

  @Post(':id')
  async notification(
    @Body() data: FacebookNotification,
    @Param('id') discordId: string,
  ): Promise<string> {
    console.log(
      '------------------------[ FACEBOOK NOTIFICATION ]------------------------',
    );
    console.log(JSON.stringify(data, null, 2));

    const channelId = this.streamService.getFacebookChannel();

    if (!channelId) {
      console.warn('Channel not found for Facebook Notification');
      return 'Ok';
    }

    const { client } = this.facebookGateway;
    const channel = await client.channels.fetch(channelId);

    const user: User = await client.users.fetch(discordId);

    if (!user) {
      console.warn(`User ${discordId} is not in the server`);
      return 'Ok';
    }

    const thumbnail = `${data.embeds[0].image.url}?uuid=${v4()}`;
    const [title, profileUrl] = data.embeds[0].description.split('\n');

    const message = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(title)
      .setDescription(
        `<@${user.id}> está transmitiendo en vivo. ¡Preparen sus hosts!`,
      )
      .setAuthor(
        `${data.embeds[0].author.name} ha comenzado una transmisión en Facebook Gaming`,
        data.embeds[0].author.icon_url,
      )
      .setThumbnail(
        'https://logodownload.org/wp-content/uploads/2019/07/facebook-gaming.png',
      )
      .setImage(thumbnail)
      .setFooter('Facebook Gaming Notification Bot')
      .setURL(profileUrl);

    await (channel as any).send(message);

    return 'Ok';
  }
}
