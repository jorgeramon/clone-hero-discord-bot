import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { Client } from 'discord.js';
import { DiscordModuleOptions } from '@discord/discord.module';

@Injectable()
export class ClientService extends Client implements OnApplicationBootstrap {
  public readonly token: string;
  public readonly prefix: string;

  constructor(options: DiscordModuleOptions) {
    super();
    this.token = options.token;
    this.prefix = options.prefix;
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.login(this.token);
  }

  getDiscordClient(): Client {
    return this as Client;
  }
}
