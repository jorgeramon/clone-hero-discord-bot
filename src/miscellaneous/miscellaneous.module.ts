import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AdminGateway } from './gateway/admin.gateway';
import { CommandsGateway } from './gateway/commands.gateway';
import { TimerGateway } from './gateway/timer.gateway';

@Module({
  providers: [CommandsGateway, TimerGateway, AdminGateway],
  imports: [SharedModule],
})
export class MiscellaneousModule {}
