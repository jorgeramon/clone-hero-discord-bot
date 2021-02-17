import { ConfigModule, ConfigService } from '@nestjs/config';

import { DiscordModule } from '@discord/discord.module';
import { FacebookModule } from '@facebook/facebook.module';
import { FunaModule } from '@funa/funa.module';
import { MiscellaneousModule } from '@miscellaneous/miscellaneous.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { TwitchModule } from '@twitch/twitch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    TwitchModule,
    FunaModule,
    MiscellaneousModule,
    SharedModule.forRootGuards(),
    FacebookModule,
  ],
})
export class AppModule {}
