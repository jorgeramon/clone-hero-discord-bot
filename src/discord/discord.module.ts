import { BootstrapService } from './service/bootstrap.service';
import { DiscordService } from './service/discord.service';
import { DiscoveryModule } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [DiscoveryModule],
  providers: [DiscordService, BootstrapService],
})
export class DiscordModule {}
