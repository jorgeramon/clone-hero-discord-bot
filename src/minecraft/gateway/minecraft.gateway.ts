import { Command } from '@discord/decorator/command.decorator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Servers } from '@shared/enum/servers.enum';
import { Message } from 'discord.js';
import { queryFull } from 'minecraft-server-util';

@Injectable()
export class MinecraftGateway {
  constructor(private readonly configService: ConfigService) {}

  @Command({
    name: 'minecraft',
    description: 'Muestra todos los detalles sobre el servidor de minecraft',
    onlyFor: Servers.PHC,
  })
  async minecraft(message: Message): Promise<void> {
    try {
      const MINECRAFT_HOST = this.configService.get<string>('MINECRAFT_HOST');
      const response = await queryFull(MINECRAFT_HOST);

      await message.channel.send([
        `Estatus del servidor: **En línea** ✅`,
        '',
        `Dirección IP/Dominio: **${MINECRAFT_HOST}**`,
        '',
        `Versión: **${response.version}**`,
        '',
        `Jugadores conectados: **${response.onlinePlayers}**`,
      ]);
    } catch (e) {
      await message.channel.send('El servidor no se encuentra disponible ❌');
    }
  }

  @Command({
    name: 'minecraft',
    description: 'Muestra el estatus del servidor de Minecraft',
    action: 'status',
    onlyFor: Servers.PHC,
  })
  async status(message: Message): Promise<void> {
    try {
      const MINECRAFT_HOST = this.configService.get<string>('MINECRAFT_HOST');
      await queryFull(MINECRAFT_HOST);

      await message.channel.send('El servidor se encuentra en línea ✅');
    } catch (e) {
      await message.channel.send('El servidor no se encuentra disponible ❌');
    }
  }

  @Command({
    name: 'minecraft',
    description: 'Muestra los jugadores conectados al servidor',
    action: 'players',
    onlyFor: Servers.PHC,
  })
  async players(message: Message): Promise<void> {
    try {
      const MINECRAFT_HOST = this.configService.get<string>('MINECRAFT_HOST');
      const response = await queryFull(MINECRAFT_HOST);

      await message.channel.send([
        `Hay **${response.onlinePlayers}** ${
          response.onlinePlayers === 1
            ? 'jugador conectado'
            : 'jugadores conectados'
        }`,
        '',
        ...response.players,
      ]);
    } catch (e) {
      await message.channel.send('El servidor no se encuentra disponible ❌');
    }
  }
}
