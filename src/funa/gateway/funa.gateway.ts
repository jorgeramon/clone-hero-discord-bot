import { Client, Message, User } from 'discord.js';

import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { Command } from '@discord/decorator/command.decorator';
import { Emotes } from '@shared/enum/emotes.enum';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { FunaService } from '@funa/service/funa.service';
import { Guards } from '@discord/decorator/guard.decorator';
import { IFunaReport } from '@funa/interface/funa-report.interface';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { Injectable } from '@nestjs/common';
import { LupitaGuard } from '@shared/guard/lupita.guard';

@Injectable()
export class FunaGateway {
  @InjectClient()
  client: Client;

  constructor(private readonly funaService: FunaService) {}

  @Command({ name: 'funadores' })
  async funadores(message: Message, args: string[]): Promise<void> {
    let limit: number = parseInt(args[0]);
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

  @Command({ name: 'funados' })
  async funados(message: Message, args: string[]): Promise<void> {
    let limit: number = parseInt(args[0]);
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

  @Guards(BotMentionGuard)
  @Command({ name: 'funas' })
  async funas(message: Message): Promise<void> {
    let data = {
      username: null,
      isForMe: false,
      counter: 0,
    };

    if (!message.mentions.users.size) {
      const documents = await this.funaService.getFunasByUser(message.author);

      data.isForMe = true;
      data.counter = documents.length;
    } else {
      const user = message.mentions.users.first();
      const documents = await this.funaService.getFunasByUser(user);

      data.username = user.username;
      data.counter = documents.length;
    }

    if (data.isForMe) {
      await message.reply(this.createResponseMessage(data));
    } else {
      await message.channel.send(this.createResponseMessage(data));
    }
  }

  @Guards(ChristmasGuard, LupitaGuard, BotMentionGuard, EmptyMentionGuard)
  @Command({ name: 'funa' })
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

  @Command({ name: 'funar' })
  async funar(message: Message): Promise<void> {
    await message.reply(
      `el comando es \`!funa\`... estás todo meco ${Emotes.KEK} ${Emotes.KEKW}`,
    );
  }

  private createResponseMessage({ isForMe, username, counter }): string {
    const times = counter > 1 ? 'veces' : 'vez';

    switch (true) {
      case isForMe && !counter:
        return `no has sido funado crack ${Emotes.JARMONIS_APPROVES}`;

      case isForMe && counter > 0:
        return `has sido funado **${counter}** ${times} ${Emotes.JARMONIS}`;

      case !isForMe && !counter:
        return `${username} no ha sido funado ${Emotes.JARMONIS_APPROVES}`;

      case !isForMe && counter > 0:
        return `${username} ha sido funado **${counter}** ${times} ${Emotes.JARMONIS}`;
    }
  }
}
