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
  @Command({ name: '{bot}', actions: ['info', 'roles'] })
  async showAllRoles(message: Message): Promise<void> {
    await message.channel.send(
      this.client.guilds.cache
        .first()
        .roles.cache.map((role) => `\`${role.id}\`: ${role.name}`),
    );
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
