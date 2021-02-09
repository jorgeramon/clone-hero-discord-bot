import { Client } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService extends Client {
  public readonly token: string;
  public readonly prefix: string;

  constructor(private readonly configService: ConfigService) {
    super();
    this.token = this.configService.get<string>('BOT_TOKEN');
    this.prefix = this.configService.get<string>('COMMAND_PREFIX');
  }

  async connect(): Promise<void> {
    await this.login(this.token);
  }

  getDiscordClient(): Client {
    return this as Client;
  }
}
