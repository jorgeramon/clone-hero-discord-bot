import { AdminGateway } from './gateway/admin.gateway';
import { CommandsGateway } from './gateway/commands.gateway';
import { Module } from '@nestjs/common';
import { ServerController } from './controller/server.controller';
import { SharedModule } from '@shared/shared.module';
import { TimerGateway } from './gateway/timer.gateway';

@Module({
  controllers: [ServerController],
  providers: [CommandsGateway, TimerGateway, AdminGateway],
  imports: [SharedModule],
})
export class MiscellaneousModule {}
