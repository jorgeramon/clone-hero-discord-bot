import { Client, Message } from 'discord.js';

import { Command } from '@discord/decorator/command.decorator';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@user/interface/user.interface';
import { InjectClient } from '@discord/decorator/inject-client.decorator';
import { InjectPrefix } from '@discord/decorator/inject-prefix.decorator';
import { Injectable } from '@nestjs/common';
import { UserService } from '@user/service/user.service';

@Injectable()
export class FacebookGateway {
  @InjectClient()
  client: Client;

  @InjectPrefix()
  prefix: string;

  private readonly webhookHost: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.webhookHost = this.configService.get<string>('FB_WEBHOOK_HOST');
  }

  @Command({
    name: 'fb',
    description:
      'Genera un enlace que deberá configurarse en Creators Studio (aplica únicamente para usuarios con Level Up).',
  })
  async fb(message: Message): Promise<void> {
    try {
      const user: IUser = await this.userService.findOrCreate(message.author);
      const url = this.webhookHost.replace('{id}', user.id);

      await message.reply([
        'éste es tu enlace personalizado para activar tus notificaciones:',
        url,
        '',
        `Para saber cómo configurar este enlace por favor ejecuta el comando \`${this.prefix}fb setup\`.`,
        '',
        '**IMPORTANTE:** Debido a las limitaciones técnicas de Facebook éste enlace sólo puede ser configurado por streamers con Level Up.',
      ]);
    } catch (e) {
      console.error(e);
      await message.reply(`hubo un error al generar tu enlace para FB Gaming`);
    }
  }

  @Command({
    name: 'fb',
    action: 'setup',
    description:
      'Muestra los pasos para configurar el enlace personalizado a través de Creators Studio.',
  })
  async setup(message: Message) {
    await message.channel.send(
      'Paso 1. Ingresa a tu *Creators Studio* y busca el recuadro de **Acciones**, da click en el botón de **Notificacionces de Discord**.',
      {
        files: [
          'https://firebasestorage.googleapis.com/v0/b/storage-a4f70.appspot.com/o/image_2021-02-22_093539.png?alt=media',
        ],
      },
    );

    await message.channel.send(
      'Paso 2. Ingresa tu enlace personalizado en el primer cuadro de texto. No es necesario ingresar un mensaje personalizado (la información se tomará de tu transmisión). Para guardar los cambios da click en **Configurar Webhook**.',
      {
        files: [
          'https://firebasestorage.googleapis.com/v0/b/storage-a4f70.appspot.com/o/image_2021-02-22_093501.png?alt=media',
        ],
      },
    );

    await message.channel.send(
      'Si anteriormente habías configurado un Webhook o bien no estás seguro si lo hiciste bien, puedas dar click en el botón de **Eliminar Webhook** y repetir el proceso.',
    );
  }
}
