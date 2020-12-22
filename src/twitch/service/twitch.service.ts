import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { TwitchApiService } from './twitch-api.service';

@Injectable()
export class TwitchService implements OnApplicationBootstrap {
  constructor(private readonly twitchApiService: TwitchApiService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.twitchApiService.fetchAppAccessToken();
  }
}
