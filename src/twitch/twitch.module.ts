import { Module } from '@nestjs/common';
import { TwitchApiService } from './service/twitch-api.service';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserModule } from '@user/user.module';
import { WebhookController } from './controller/webhook.controller';

@Module({
  imports: [UserModule],
  controllers: [WebhookController],
  providers: [TwitchApiService, TwitchService, TwitchGateway],
})
export class TwitchModule {}
