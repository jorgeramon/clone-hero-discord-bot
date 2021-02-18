import {
  CHHChannels,
  PHCChannels,
  RBEChannels,
} from '@shared/enum/channels.enum';
import { CHHRoles, PHCRoles, RBERoles, Roles } from '@shared/enum/roles.enum';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Servers } from '@shared/enum/servers.enum';
import { TwitchGames } from '@shared/enum/twitch-games.enum';

@Injectable()
export class EnvironmentService implements OnApplicationBootstrap {
  public roles: Roles;
  public streamChannels: Object;

  private readonly currentServer: string;

  constructor(private readonly configService: ConfigService) {
    this.currentServer = this.configService.get<string>('ENV');
  }

  onApplicationBootstrap(): void {
    this.getRoles();
    this.getStreamsChannels();
  }

  private getRoles(): void {
    switch (this.currentServer) {
      case Servers.CHH:
        this.roles = CHHRoles;
        break;

      case Servers.PHC:
        this.roles = PHCRoles;
        break;

      case Servers.RBE:
        this.roles = RBERoles;
        break;
    }
  }

  private getStreamsChannels(): void {
    this.streamChannels = this.getStreamChannelsPerGame()[this.currentServer];
  }

  private getStreamChannelsPerGame(): Object {
    return {
      [Servers.CHH]: {
        [CHHChannels.STREAMS_EN_VIVO]: Object.values(TwitchGames),
      },

      [Servers.PHC]: {
        [PHCChannels.STREAMS_GH]: [
          TwitchGames.BAND_HERO,
          TwitchGames.GUITAR_HERO,
          TwitchGames.GUITAR_HERO_2,
          TwitchGames.GUITAR_HERO_3,
          TwitchGames.GUITAR_HERO_5,
          TwitchGames.GUITAR_HERO_80s,
          TwitchGames.GUITAR_HERO_METALLICA,
          TwitchGames.GUITAR_HERO_SMASH_HITS,
          TwitchGames.GUITAR_HERO_VAN_HALEN,
          TwitchGames.GUITAR_HERO_WARRIORS_OF_ROCK,
          TwitchGames.GUITAR_HERO_WORLD_TOUR,
        ],

        [PHCChannels.STREAMS_CH]: [TwitchGames.CLONE_HERO],

        [PHCChannels.STREAMS_RB]: [
          TwitchGames.GREEN_DAY_ROCK_BAND,
          TwitchGames.LEGO_ROCK_BAND,
          TwitchGames.ROCK_BAND,
          TwitchGames.ROCK_BAND_2,
          TwitchGames.ROCK_BAND_3,
          TwitchGames.ROCK_BAND_4,
          TwitchGames.THE_BEATLES_ROCK_BAND,
        ],

        [PHCChannels.STREAMS_OTRO]: true,
      },

      [Servers.RBE]: {
        [RBEChannels.TWITCH]: [
          TwitchGames.ROCK_BAND,
          TwitchGames.ROCK_BAND_2,
          TwitchGames.ROCK_BAND_3,
          TwitchGames.ROCK_BAND_4,
          TwitchGames.PHASE_SHIFT,
        ],
      },
    };
  }
}
