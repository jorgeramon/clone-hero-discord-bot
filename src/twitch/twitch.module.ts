import { BootstrapService } from '@twitch/service/bootstrap.service';
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { TwitchController } from '@twitch/controller/twitch.controller';
import { TwitchGateway } from '@twitch/gateway/twitch.gateway';
import { TwitchService } from '@twitch/service/twitch.service';
import { UserModule } from '@user/user.module';
import { WebhookController } from '@twitch/controller/webhook.controller';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [TwitchController, WebhookController],
  providers: [TwitchService, BootstrapService, TwitchGateway],
})
export class TwitchModule {}
