import { LimitDTO } from '@funa/dto/limit.dto';
import { IFunaReport } from '@funa/interface/funa-report.interface';
import { FunaService } from '@funa/service/funa.service';
import { Injectable } from '@nestjs/common';
import { Emotes } from '@shared/enum/emotes.enum';
import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { LupitaGuard } from '@shared/guard/lupita.guard';
import {
  Client,
  Content,
  Context,
  DiscordClient,
  OnCommand,
  UseGuards,
} from 'discord-nestjs';
import { Message, User } from 'discord.js';

@Injectable()
export class FunaGateway {
  @Client()
  client: DiscordClient;

  constructor(private readonly funaService: FunaService) {}
  @OnCommand({ name: 'funadores' })
  async funadores(
    @Content() content: LimitDTO,
    @Context() context: any[],
  ): Promise<void> {
    const message: Message = context[0];

    let limit: number = parseInt(content.limit);
    limit = limit > 0 && limit <= 15 ? limit : 3;

    const funas: IFunaReport[] = await this.funaService.getTopFunatorsReport(
      limit > 0 && limit <= 15 ? limit : 3,
    );

    const top: number = limit > funas.length ? funas.length : limit;

    const messages: string[] = [];

    if (!funas.length) {
      messages.push(`Aún no hay funadores ${Emotes.FISH_DEPRESION}`);
    } else if (funas.length === 1) {
      const { user, count } = funas[0];
      const discordUser: User = await this.client.users.fetch(user.id);
      messages.push(
        `${discordUser.username} es el funador más HDP del server con **${count}** funaciones ${Emotes.TOMK}`,
      );
    } else {
      messages.push(`Top ${top} funadores más HDP del server ${Emotes.TOMK}`);

      for (let i = 1; i <= funas.length; i++) {
        const { user, count } = funas[i - 1];
        const discordUser: User = await this.client.users.fetch(user.id);
        messages.push(
          `${i}. ${discordUser.username} con **${count}** funaciones`,
        );
      }
    }

    await message.channel.send(messages);
  }

  @OnCommand({ name: 'funados' })
  async funados(
    @Content() content: LimitDTO,
    @Context() context: any[],
  ): Promise<void> {
    const message: Message = context[0];

    let limit: number = parseInt(content.limit);
    limit = limit > 0 && limit <= 15 ? limit : 3;

    const funas: IFunaReport[] = await this.funaService.getTopFunasReport(
      limit > 0 && limit <= 15 ? limit : 3,
    );

    const top: number = limit > funas.length ? funas.length : limit;

    const messages: string[] = [];

    if (!funas.length) {
      messages.push(`Aún no hay funados ${Emotes.FISH_DEPRESION}`);
    } else if (funas.length === 1) {
      const { user, count } = funas[0];
      const discordUser: User = await this.client.users.fetch(user.id);
      messages.push(
        `${discordUser.username} es el más funado del server con **${count}** funaciones ${Emotes.KEK}`,
      );
    } else {
      messages.push(`Top ${top} más funados del server ${Emotes.KEK}`);

      for (let i = 1; i <= funas.length; i++) {
        const { user, count } = funas[i - 1];
        const discordUser: User = await this.client.users.fetch(user.id);
        messages.push(
          `${i}. ${discordUser.username} con **${count}** funaciones`,
        );
      }
    }

    await message.channel.send(messages);
  }

  @UseGuards(ChristmasGuard, LupitaGuard, BotMentionGuard, EmptyMentionGuard)
  @OnCommand({ name: 'funa' })
  async funa(message: Message): Promise<void> {
    await Promise.all(
      message.mentions.users.map((user: User) =>
        this.funaService.funa(message.author, user),
      ),
    );

    let responseMessage = message.mentions.users
      .map((user: User) => `<@${user.id}>`)
      .join(', ');

    responseMessage +=
      message.mentions.users.size > 1 ? ' han sido funados' : ' ha sido funado';

    await message.channel.send(`${responseMessage} ${Emotes.JARMONIS_RAGE}`);
  }
}
