import { EnvironmentService } from './environment.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamService {
  constructor(private readonly environmentService: EnvironmentService) {}

  getChannels(): string[] {
    return Object.keys(this.environmentService.streamChannels);
  }

  getChannelByGame(gameId: string): string {
    return Object.entries(this.environmentService.streamChannels)
      .map((entry) =>
        entry[1] === true || entry[1].includes(gameId) ? entry[0] : null,
      )
      .find((channelId) => !!channelId);
  }
}
