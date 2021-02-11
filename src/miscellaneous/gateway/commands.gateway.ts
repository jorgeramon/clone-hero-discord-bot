import { Client, Message } from 'discord.js';
import {
  adminDocumentation,
  publicDocumentation,
} from '@discord/service/bootstrap.service';

import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { InjectPrefix } from '@discord/decorator/inject-prefix.decorator';
import { Injectable } from '@nestjs/common';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';

@Injectable()
export class CommandsGateway {
  @InjectPrefix()
  prefix: string;

  @InjectClient()
  client: Client;

  @Command({ name: '{bot}', action: 'comandos' })
  async showPublicCommands(message: Message): Promise<void> {
    await message.channel.send(
      publicDocumentation.length
        ? this.addSpaceBetween(publicDocumentation)
        : 'No hay comandos disponibles',
    );
  }

  @Guards(IsAdminGuard)
  @Command({ name: '{bot}', actions: ['comandos', 'admin'] })
  async showAdminCommands(message: Message): Promise<void> {
    await message.channel.send(
      adminDocumentation.length
        ? this.addSpaceBetween(adminDocumentation)
        : 'No hay comandos disponibles',
    );
  }

  @Guards(IsAdminGuard)
  @Command({ name: '{bot}', actions: ['roles'] })
  async showAllRoles(message: Message, args: string[]): Promise<void> {
    if (!args.length) {
      await message.channel.send(
        this.client.guilds.cache
          .first()
          .roles.cache.map((role) => `\`${role.id}\`: ${role.name}`),
      );
    } else {
      const role = await this.client.guilds.cache
        .first()
        .roles.cache.find(
          (role) => role.name.toLowerCase() === args.join(' ').toLowerCase(),
        );

      await message.channel.send(
        role ? `\`${role.id}\`: ${role.name}` : 'No se encontró el rol',
      );
    }
  }

  @Guards(IsAdminGuard)
  @Command({ name: '{bot}', actions: ['canales'] })
  async showAllChannels(message: Message, args: string[]): Promise<void> {
    if (!args.length) {
      await message.channel.send(
        this.client.guilds.cache
          .first()
          .channels.cache.map(
            (channel) => `\`${channel.id}\`: ${channel.name}`,
          ),
      );
    } else {
      const channel = await this.client.guilds.cache
        .first()
        .channels.cache.find(
          (channel) =>
            channel.name.toLowerCase() === args.join(' ').toLowerCase(),
        );

      await message.channel.send(
        channel
          ? `\`${channel.id}\`: ${channel.name}`
          : 'No se encontró el canal',
      );
    }
  }

  @Guards(IsAdminGuard)
  @Command({ name: '{bot}', actions: ['emotes'] })
  async showAllEmotes(message: Message, args: string[]): Promise<void> {
    if (!args.length) {
      await message.channel.send(
        this.client.guilds.cache
          .first()
          .emojis.cache.map((emoji) => `\`${emoji.id}\`: ${emoji.name}`),
      );
    } else {
      const emoji = await this.client.guilds.cache
        .first()
        .emojis.cache.find(
          (emoji) => emoji.name.toLowerCase() === args.join(' ').toLowerCase(),
        );

      await message.channel.send(
        emoji
          ? `\`${emoji.id}\`: <:${emoji.name}:${emoji.id}>`
          : 'No se encontró el emoji',
      );
    }
  }

  private addSpaceBetween(array: string[]): string[] {
    const result: string[] = array.reduce(
      (accumulator, value) => [...accumulator, value, ''],
      [],
    );
    result.pop();
    return result;
  }
}
