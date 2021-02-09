import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { TwitchService } from './twitch.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(private readonly twitchService: TwitchService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.twitchService.fetchAppAccessToken();
  }
}
