import { Module } from '@nestjs/common';
import { TwitchApiService } from '@twitch/service/twitch-api.service';
import { TwitchController } from '@twitch/controller/twitter.controller';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserModule } from '@user/user.module';
import { WebhookController } from '@twitch/controller/webhook.controller';

@Module({
  imports: [UserModule],
  controllers: [TwitchController, WebhookController],
  providers: [TwitchApiService, TwitchService, TwitchGateway],
})
export class TwitchModule {}
