import { HubModes } from '@facebook/enum/hub-modes.enum';
import { FacebookEvent } from '@facebook/interface/facebook-event.interface';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('facebook/webhook')
export class WebhookController {
  private readonly VERIFY_TOKEN: string;

  constructor(private readonly configService: ConfigService) {
    this.VERIFY_TOKEN = this.configService.get<string>('FB_VERIFY_TOKEN');
  }

  @Get()
  verification(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
  ): string {
    if (mode === HubModes.Subscribe && verifyToken === this.VERIFY_TOKEN) {
      return challenge;
    } else {
      throw new BadRequestException();
    }
  }

  @Post()
  notification(@Body() event: FacebookEvent): string {
    console.log(event);
    return 'Ok';
  }
}
