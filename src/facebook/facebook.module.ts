import { FacebookController } from '@facebook/controller/facebook.controller';
import { Module } from '@nestjs/common';
import { WebhookController } from '@facebook/controller/webhook.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [FacebookController, WebhookController],
})
export class FacebookModule {}
