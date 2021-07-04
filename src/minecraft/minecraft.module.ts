import { Module } from '@nestjs/common';
import { MinecraftGateway } from './gateway/minecraft.gateway';

@Module({
  providers: [MinecraftGateway],
})
export class MinecraftModule {}
