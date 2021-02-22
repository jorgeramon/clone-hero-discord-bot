import { EnvironmentService } from './environment.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamService {
  constructor(private readonly environmentService: EnvironmentService) {}

  getFacebookChannel(): string {
    return this.environmentService.facebookStreamChannel;
  }

  getTwitchChannels(): string[] {
    return Object.keys(this.environmentService.twitchStreamChannels);
  }

  getTwitchChannelByGame(gameId: string): string {
    return Object.entries(this.environmentService.twitchStreamChannels)
      .map((entry) =>
        entry[1] === true || entry[1].includes(gameId) ? entry[0] : null,
      )
      .find((channelId) => !!channelId);
  }
}
