import { ConfigModule, ConfigService } from '@nestjs/config';

import { DiscordModule } from '@discord/discord.module';
import { FunaModule } from '@funa/funa.module';
import { MiscellaneousModule } from 'miscellaneous/miscellaneous.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        prefix: configService.get<string>('COMMAND_PREFIX'),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    FunaModule,
    MiscellaneousModule,
    SharedModule.forRootGuards(),
  ],
})
export class AppModule {}
