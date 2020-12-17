import { ConfigModule, ConfigService } from '@nestjs/config';

import { DiscordModule } from 'discord-nestjs';
import { FunaModule } from '@funa/funa.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        commandPrefix: configService.get<string>('COMMAND_PREFIX'),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    FunaModule,
  ],
})
export class AppModule {}
