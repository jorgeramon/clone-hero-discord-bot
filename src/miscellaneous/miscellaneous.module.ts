import { ChhBotGateway } from './gateway/chhbot.gateway';
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { TimerGateway } from './gateway/timer.gateway';

@Module({
  providers: [ChhBotGateway, TimerGateway],
  imports: [SharedModule],
})
export class MiscellaneousModule {}
