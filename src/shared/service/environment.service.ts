import {
  CHHChannels,
  Channels,
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
  public twitchStreamChannels: Object;
  public facebookStreamChannel: Channels;

  private readonly currentServer: string;

  constructor(private readonly configService: ConfigService) {
    this.currentServer = this.configService.get<string>('ENV');
  }

  onApplicationBootstrap(): void {
    this.setRoles();
    this.setTwitchStreamsChannels();
    this.setFacebookStreamChannel();
  }

  private setRoles(): void {
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

  private setTwitchStreamsChannels(): void {
    this.twitchStreamChannels = this.getTwitchStreamChannelsPerGame()[
      this.currentServer
    ];
  }

  private getTwitchStreamChannelsPerGame(): Object {
    return {
      [Servers.CHH]: {
        [CHHChannels.STREAMS_EN_VIVO]: Object.values(TwitchGames),
      },

      [Servers.PHC]: {
        [PHCChannels.TWITCH]: Object.values(TwitchGames),
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

  private setFacebookStreamChannel(): void {
    switch (this.currentServer) {
      case Servers.CHH:
        this.facebookStreamChannel = CHHChannels.STREAMS_EN_VIVO;
        break;

      case Servers.PHC:
        this.facebookStreamChannel = PHCChannels.FACEBOOK;
        break;

      case Servers.RBE:
        this.facebookStreamChannel = RBEChannels.FACEBOOK_LIVE;
        break;
    }
  }
}
