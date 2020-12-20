import { ChhBotGateway } from './gateway/chhbot.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChhBotGateway],
})
export class MiscellaneousModule {}
