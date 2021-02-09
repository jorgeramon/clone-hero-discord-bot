import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ITwitchGame } from '@twitch/interface/twitch-game.interface';
import { ITwitchSubscription } from '@twitch/interface/twitch-subscription.interface';
import { TwitchService } from '@twitch/service/twitch.service';

@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchApiService: TwitchService) {}

  @Get()
  helloWorld(): string {
    return 'Hello World!';
  }

  @Get('subscriptions')
  getSubscriptions(): Promise<ITwitchSubscription> {
    return this.twitchApiService.fetchCurrentSubscriptions();
  }

  @Get('games')
  getGames(@Query('name') name: string): Promise<ITwitchGame> {
    return this.twitchApiService.fetchGames(name);
  }

  @Delete('subscriptions/:id')
  async deleteSubscription(@Param('id') id: string): Promise<string> {
    await this.twitchApiService.deleteSubscription(id);
    return 'Ok';
  }
}
