import { BootstrapService } from '@twitch/service/bootstrap.service';
import { Module } from '@nestjs/common';
import { TwitchController } from '@twitch/controller/twitch.controller';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserModule } from '@user/user.module';
import { WebhookController } from '@twitch/controller/webhook.controller';

@Module({
  imports: [UserModule],
  controllers: [TwitchController, WebhookController],
  providers: [TwitchService, BootstrapService, TwitchGateway],
})
export class TwitchModule {}
