import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectPrefix } from '@discord/decorator/inject-prefix.decorator';
import {
  adminDocumentation,
  publicDocumentation,
} from '@discord/service/bootstrap.service';
import { Injectable } from '@nestjs/common';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';
import { Message } from 'discord.js';

@Injectable()
export class CommandsGateway {
  @InjectPrefix()
  prefix: string;

  @Command({ name: 'bot', action: 'comandos' })
  async showPublicCommands(message: Message, args: string[]): Promise<void> {
    await message.channel.send(
      publicDocumentation.length
        ? this.addSpaceBetween(publicDocumentation)
        : 'No hay comandos disponibles',
    );
  }

  @Guards(IsAdminGuard)
  @Command({ name: 'bot', actions: ['comandos', 'admin'] })
  async showAdminCommands(message: Message, args: string[]): Promise<void> {
    await message.channel.send(
      adminDocumentation.length
        ? this.addSpaceBetween(adminDocumentation)
        : 'No hay comandos disponibles',
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
