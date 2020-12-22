import { Controller, Get } from '@nestjs/common';

@Controller('twitch')
export class TwitchController {
  @Get()
  helloWorld(): string {
    return 'Hello World!';
  }
}
