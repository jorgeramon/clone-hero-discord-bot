import { Command } from '@discord/decorator/command.decorator';
import { Guards } from '@discord/decorator/guard.decorator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Servers } from '@shared/enum/servers.enum';
import { IsAdminGuard } from '@shared/guard/is-admin.guard';
import { Message } from 'discord.js';
import { queryFull, RCON } from 'minecraft-server-util';

@Injectable()
export class MinecraftGateway {
  private MINECRAFT_HOST: string;

  constructor(private readonly configService: ConfigService) {
    this.MINECRAFT_HOST = this.configService.get<string>('MINECRAFT_HOST');
  }

  @Command({
    name: 'minecraft',
    description: 'Muestra todos los detalles sobre el servidor de minecraft',
    onlyFor: Servers.PHC,
  })
  async minecraft(message: Message): Promise<void> {
    try {
      const response = await queryFull(this.MINECRAFT_HOST);

      await message.channel.send([
        `Estatus del servidor: **En línea** ✅`,
        '',
        `Dirección IP/Dominio: **${this.MINECRAFT_HOST}**`,
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
      await queryFull(this.MINECRAFT_HOST);

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
      const response = await queryFull(this.MINECRAFT_HOST);

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

  @Guards(IsAdminGuard)
  @Command({
    name: 'rcon',
    description:
      'Ejecuta un comando en el servidor de minecraft a través de RCON',
    onlyFor: Servers.PHC,
  })
  async command(message: Message, args: string[]): Promise<void> {
    try {
      const MINECRAFT_RCON_PASSWORD = this.configService.get<string>(
        'MINECRAFT_RCON_PASSWORD',
      );

      const MINECRAFT_RCON_PORT = this.configService.get<number>(
        'MINECRAFT_RCON_PORT',
      );

      const client = new RCON(this.MINECRAFT_HOST, {
        password: MINECRAFT_RCON_PASSWORD,
        port: Number(MINECRAFT_RCON_PORT),
      });

      await client.connect();

      client.once('output', async () => {
        client.close();
      });

      await client.run(args.join(' '));
    } catch (e) {
      console.error(e);
      await message.channel.send('El servidor no se encuentra disponible ❌');
    }
  }
}
