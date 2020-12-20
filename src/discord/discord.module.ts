import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

import { BootstrapService } from '@discord/service/bootstrap.service';
import { ClientService } from './service/client.service';
import { DISCORD_MODULE_OPTIONS } from './constant/factory';
import { DiscoveryModule } from '@nestjs/core';

export type DiscordModuleOptions = { token: string; prefix: string };

export interface DiscordModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<DiscordModuleOptions> | DiscordModuleOptions;
  inject?: any[];
}

@Module({
  imports: [DiscoveryModule],
})
export class DiscordModule {
  static forRootAsync(options: DiscordModuleAsyncOptions): DynamicModule {
    return {
      module: DiscordModule,
      imports: options.imports || [],
      providers: [
        BootstrapService,
        {
          provide: DISCORD_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: ClientService,
          useFactory: async (options: DiscordModuleOptions) =>
            new ClientService(options),
          inject: [DISCORD_MODULE_OPTIONS],
        },
      ],
    };
  }
}
