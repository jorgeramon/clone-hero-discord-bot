import { FacebookGateway } from '@facebook/gateway/facebook.gateway';
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@user/user.module';
import { WebhookController } from '@facebook/controller/webhook.controller';

@Module({
  imports: [SharedModule, UserModule],
  providers: [FacebookGateway],
  controllers: [WebhookController],
})
export class FacebookModule {}
