import { ConfigService } from '@nestjs/config';
import { ITwitchStream } from '@twitch/interface/twitch-stream.interface';
import { ITwitchUser } from '@twitch/interface/twitch-user.interface';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

export type AppAccessToken = { accessToken: string; expiresIn: number };

@Injectable()
export class TwitchApiService {
  private appAccessToken: AppAccessToken;
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly CALLBACK_HOST: string;
  private readonly SECRET: string;
  private readonly HELIX_API: string = 'https://api.twitch.tv/helix';
  private readonly AUTH_API: string = 'https://id.twitch.tv/oauth2';

  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.get<string>('TWITCH_CLIENT');
    this.CLIENT_SECRET = this.configService.get<string>('TWITCH_SECRET');
    this.CALLBACK_HOST = this.configService.get<string>('TWITCH_HOST');
    this.SECRET = this.configService.get<string>('SERVER_SECRET');
  }

  async fetchAppAccessToken(): Promise<void> {
    const response = await axios.post(`${this.AUTH_API}/token`, null, {
      params: {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });

    const { access_token, expires_in } = response.data;

    this.appAccessToken = { accessToken: access_token, expiresIn: expires_in };
  }

  async fetchCurrentSubscriptions(): Promise<any> {
    const response = await axios.get(
      `${this.HELIX_API}/eventsub/subscriptions`,
      {
        headers: {
          'Client-ID': this.CLIENT_ID,
          Authorization: `Bearer ${this.appAccessToken.accessToken}`,
        },
      },
    );

    const { data } = response.data;

    return data;
  }

  async fetchUserById(id: string): Promise<ITwitchUser | null> {
    const response = await axios.get(`${this.HELIX_API}/users`, {
      params: {
        id,
      },
      headers: {
        'Client-ID': this.CLIENT_ID,
        Authorization: `Bearer ${this.appAccessToken.accessToken}`,
      },
    });

    const { data } = response.data;

    return data.length ? (data[0] as ITwitchUser) : null;
  }

  async fetchUserByName(name: string): Promise<ITwitchUser | null> {
    const response = await axios.get(`${this.HELIX_API}/users`, {
      params: {
        login: name,
      },
      headers: {
        'Client-ID': this.CLIENT_ID,
        Authorization: `Bearer ${this.appAccessToken.accessToken}`,
      },
    });

    const { data } = response.data;

    return data.length ? (data[0] as ITwitchUser) : null;
  }

  async fetchStreamByUser(userId: string): Promise<ITwitchStream | null> {
    const response = await axios.get(`${this.HELIX_API}/streams`, {
      params: {
        user_id: userId,
      },
      headers: {
        'Client-ID': this.CLIENT_ID,
        Authorization: `Bearer ${this.appAccessToken.accessToken}`,
      },
    });

    const { data } = response.data;

    return data.length ? (data[0] as ITwitchStream) : null;
  }

  async createSubscription(twitchId: string): Promise<void> {
    await axios.post(
      `${this.HELIX_API}/eventsub/subscriptions`,
      {
        type: 'stream.online',
        version: '1',
        condition: {
          broadcaster_user_id: twitchId,
        },
        transport: {
          method: 'webhook',
          callback: `${this.CALLBACK_HOST}/twitch/webhook`,
          secret: this.SECRET,
        },
      },
      {
        headers: {
          'Client-ID': this.CLIENT_ID,
          Authorization: `Bearer ${this.appAccessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
