import { DialogFlowModule } from '@dialogflow/dialogflow.module';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { BootstrapService } from './service/bootstrap.service';
import { DiscordService } from './service/discord.service';

@Module({
  imports: [DiscoveryModule, DialogFlowModule],
  providers: [DiscordService, BootstrapService],
})
export class DiscordModule {}
