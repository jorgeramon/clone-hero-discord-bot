import { Command } from '@discord/decorator/command.decorator';
import { Emotes } from '@shared/enum/emotes.enum';
import { Guards } from '@discord/decorator/guard.decorator';
import { InjectPrefix } from '@discord/decorator/inject-prefix.decorator';
import { Injectable } from '@nestjs/common';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';
import { Message } from 'discord.js';

@Injectable()
export class ChhBotGateway {
  @InjectPrefix()
  prefix: string;

  @Command({ name: 'chhbot', action: 'comandos' })
  async showPublicCommands(message: Message, args: string[]): Promise<void> {
    const { prefix } = this;

    let messages: string[] = [
      `\`${prefix}navidad\`: Muestra los días que faltan para navidad ${Emotes.PADORUUCHH}.`,
      `\`${prefix}wonky\`: Muestra los días que faltan para el "Martes de funar a Wonky" ${Emotes.KEK}.`,
      `\`${prefix}funa [@usuario]\`: Funa a los usuarios mencionados (puede ser 1 o más). NO ABUSES DE ESTE COMANDO HDTPM ${Emotes.JARMONIS_RAGE}.`,
      `\`${prefix}funas [@usuario] [año]\`: Muestra cuántas veces ha sido funado el usuario mencionado o tú si no mencionas a nadie. También puedes filtrar la información por un año en específico.`,
      `\`${prefix}funados [cantidad] [año]\`: Muestra los más funados del server, los 3 primeros por defecto o la cantidad especificada en el comando (máximo 15). También puedes filtrar la información por un año en específico.`,
      `\`${prefix}funadores [cantidad] [año]\`: Muestra a los más HDP del server, los 3 primeros por defecto o la cantidad especificada en el comando (máximo 15). También puedes filtrar la información por un año en específico.`,
      `\`${prefix}reversa\`: Regresas tú última funa, solo tienes 5 segundos para reaccionar, crack ${Emotes.FISH_PICARDIA}`,
    ];

    await message.channel.send(this.addSpaceBetween(messages));
  }

  @Guards(IsAdminGuard)
  @Command({ name: 'chhbot', actions: ['comandos', 'admin'] })
  async showAdminCommands(message: Message, args: string[]): Promise<void> {
    const { prefix } = this;

    let messages: string[] = [
      '**Comandos disponibles para admins/mods:**',
      `\`${prefix}rg [usuario]\`: Muestra la fecha de registro de un usuario en particular. No es necesario mencionar al usuario, sólo escribe su username.`,
    ];

    await message.channel.send(this.addSpaceBetween(messages));
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
