import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { IFunaReport } from '@funa/interface/funa-report.interface';
import { FunaService } from '@funa/service/funa.service';
import { Injectable } from '@nestjs/common';
import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { LupitaGuard } from '@shared/guard/lupita.guard';
import { WonkyDayGuard } from '@shared/guard/wonky-day.guard';
import { Client, Message, User } from 'discord.js';
import { sample } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class FunaGateway {
  @InjectClient()
  client: Client;

  private readonly SECONDS_LIMIT: number = 6;
  private readonly BASE_YEAR = 2019;
  private readonly STARTER_YEAR = 2010;

  constructor(private readonly funaService: FunaService) {}

  @Command({
    name: 'funadores',
    usage: '[cantidad] [año]',
    description:
      'Muestra a los más HDP del server, los 3 primeros por defecto o la cantidad especificada en el comando (máximo 15). También puedes filtrar la información por un año en específico.',
  })
  async funadores(message: Message, args: string[]): Promise<void> {
    let limit: number = parseInt(args[0]);
    let year: number =
      limit >= this.STARTER_YEAR ? limit : parseInt(args[1]) || moment().year();

    limit = limit > 0 && limit <= 15 ? limit : 3;

    if (this.isYearInvalid(year)) {
      await message.reply(`muy garsioso buscando en el año ${year}`);
      return;
    }

    const funas: IFunaReport[] = await this.funaService.getTopFunatorsReport(
      limit > 0 && limit <= 15 ? limit : 3,
      year,
    );

    const top: number = limit > funas.length ? funas.length : limit;

    const messages: string[] = [];

    if (!funas.length) {
      messages.push(`No hay funadores${this.customYearMessage(year)}`);
    } else if (funas.length === 1) {
      const { user, count } = funas[0];
      const discordUser: User = await this.client.users.fetch(user.id);
      messages.push(
        `${
          discordUser.username
        } es el funador más HDP del server con **${count}** funaciones${this.customYearMessage(
          year,
        )}`,
      );
    } else {
      messages.push(
        `Top ${top} funadores más HDP del server${this.customYearMessage(
          year,
        )}`,
      );

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

  @Command({
    name: 'funados',
    usage: '[cantidad] [año]',
    description:
      'Muestra los más funados del server, los 3 primeros por defecto o la cantidad especificada en el comando (máximo 15). También puedes filtrar la información por un año en específico.',
  })
  async funados(message: Message, args: string[]): Promise<void> {
    let limit: number = parseInt(args[0]);
    let year: number =
      limit >= this.STARTER_YEAR ? limit : parseInt(args[1]) || moment().year();

    limit = limit > 0 && limit <= 15 ? limit : 3;

    if (this.isYearInvalid(year)) {
      await message.reply(`muy garsioso buscando en el año ${year}`);
      return;
    }

    const funas: IFunaReport[] = await this.funaService.getTopFunasReport(
      limit > 0 && limit <= 15 ? limit : 3,
      year,
    );

    const top: number = limit > funas.length ? funas.length : limit;

    const messages: string[] = [];

    if (!funas.length) {
      messages.push(`No hay funados${this.customYearMessage(year)}`);
    } else if (funas.length === 1) {
      const { user, count } = funas[0];
      const discordUser: User = await this.client.users.fetch(user.id);
      messages.push(
        `${
          discordUser.username
        } es el más funado del server con **${count}** funaciones${this.customYearMessage(
          year,
        )}`,
      );
    } else {
      messages.push(
        `Top ${top} más funados del server${this.customYearMessage(year)}`,
      );

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
  @Command({
    name: 'funas',
    usage: '[@mencion] [año]',
    description:
      'Muestra cuántas veces ha sido funado el usuario mencionado o tú si no mencionas a nadie. También puedes filtrar la información por un año en específico.',
  })
  async funas(message: Message, args: string[]): Promise<void> {
    let year: number = parseInt(args[0]) || moment().year();

    let data = {
      username: null,
      isForMe: false,
      counter: 0,
      year,
    };

    if (this.isYearInvalid(year)) {
      await message.reply(`muy garsioso buscando en el año ${year}`);
      return;
    }

    if (!message.mentions.users.size) {
      const documents = await this.funaService.getFunasByUser(
        message.author,
        year,
      );

      data.isForMe = true;
      data.counter = documents.length;
    } else {
      const user = message.mentions.users.first();
      const documents = await this.funaService.getFunasByUser(user, year);

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
  @Command({
    name: 'funa',
    usage: '[@mencion]',
    description:
      'Funa a los usuarios mencionados (puede ser 1 o más). NO ABUSES DE ESTE COMANDO HDTPM.',
  })
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

    await message.channel.send(`${responseMessage}`);
  }

  @Command({ name: 'funar' })
  async funar(message: Message): Promise<void> {
    await message.reply(`el comando es \`!funa\`... estás todo meco`);
  }

  @Guards(WonkyDayGuard)
  @Command({
    name: 'reversa',
    description:
      'Regresas tú última funa, solo tienes 5 segundos para reaccionar, crack',
  })
  async reversa(message: Message): Promise<void> {
    const latest = await this.funaService.getLastestFromFunado(message.author);

    if (
      latest &&
      !latest.reversed &&
      moment().diff(latest.createdAt, 'seconds') <= this.SECONDS_LIMIT
    ) {
      await this.funaService.reverseFuna(latest._id);

      const reverseCards: string[] = [
        'https://i.ibb.co/BVh6VdX/red-reverse.png',
        'https://i.ibb.co/LxRWjff/blue-reverse.png',
      ];

      await message.channel.send(
        `<@${(<User>latest.from).id}> te regresan tu funa`,
        {
          files: [sample(reverseCards)],
        },
      );
    } else {
      await message.channel.send(`**No**`);
    }
  }

  private createResponseMessage({ isForMe, username, counter, year }): string {
    const times = counter > 1 ? 'veces' : 'vez';

    switch (true) {
      case isForMe && !counter:
        return `no has sido funado${this.customYearMessage(year)} crack`;

      case isForMe && counter > 0:
        return `has sido funado **${counter}** ${times}${this.customYearMessage(
          year,
        )}`;

      case !isForMe && !counter:
        return `${username} no ha sido funado${this.customYearMessage(year)}`;

      case !isForMe && counter > 0:
        return `${username} ha sido funado **${counter}** ${times}${this.customYearMessage(
          year,
        )}`;
    }
  }

  private customYearMessage(year: number): string {
    return year === moment().year() ? '' : ` en el año ${year}`;
  }

  private isYearInvalid(year: number): boolean {
    return year < this.BASE_YEAR || year > moment().year() + 1;
  }
}
