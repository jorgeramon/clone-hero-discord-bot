import { Command } from '@discord/decorator/command.decorator';
import { Emotes } from '@shared/enum/emotes.enum';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { SpecialDateService } from '@shared/service/special-date.service';
import { sample } from 'lodash';

@Injectable()
export class TimerGateway {
  constructor(private readonly specialDateService: SpecialDateService) {}

  @Command({ name: 'navidad' })
  async daysUntilChristmas(message: Message): Promise<void> {
    if (this.specialDateService.isChristmas()) {
      await message.channel.send(`HOY ES NAVIDAD ${Emotes.PADORUUCHH} 🎄 🎁`, {
        files: [
          'https://media1.giphy.com/media/l0tzgJRjGc7mGgsmXY/giphy.gif?cid=ecf05e478f1109863cc8c875b63a3020145a8476663fb7ac&rid=giphy.gif',
          'https://media.discordapp.net/attachments/781742999579131904/790387403163959336/videoplayback.gif',
        ],
      });
    } else {
      await message.channel.send(
        this.createChristmasResponse(
          this.specialDateService.daysUntilChristmas(),
        ),
      );
    }
  }

  @Command({ name: 'wonky' })
  async daysUntilWonkyDay(message: Message): Promise<void> {
    if (this.specialDateService.isWonkyDay()) {
      const gifs = [
        'https://media1.giphy.com/media/Pt5PnJVtHuy2s/giphy.gif?cid=ecf05e47g1u8p8ffxp01c2a16uo2xfs3nk8r8bgvkhlc9ntc&rid=giphy.gif',
        'https://media1.giphy.com/media/l0Exhlza2TqHJzk5y/giphy.gif?cid=ecf05e47g1u8p8ffxp01c2a16uo2xfs3nk8r8bgvkhlc9ntc&rid=giphy.gif',
        'https://media0.giphy.com/media/RHP0azDLoGmMYZHNLI/giphy.gif?cid=ecf05e47o4rb7jqzm6idyqk333ziz89rm5m12i2qm2ivfs5y&rid=giphy.gif',
        'https://media2.giphy.com/media/804TNmnYLfNao/giphy.gif?cid=ecf05e4770ius12g8qi5jh3rvrfeq3f6lyfwtb36dpquvsf9&rid=giphy.gif',
      ];

      await message.channel.send(
        `Hoy es el día de funar a Wonky ${Emotes.KEK}`,
        {
          files: [sample(gifs)],
        },
      );
    } else {
      await message.channel.send(
        this.createWonkyResponse(this.specialDateService.daysUntilWonkyDay()),
      );
    }
  }

  private createWonkyResponse(days: number): string {
    return `${days > 1 ? 'Faltan' : 'Falta'} **${days}** ${
      days > 1 ? 'días' : 'día'
    } para el "Martes de funar a Wonky" ${Emotes.JARMONIS_APPROVES}`;
  }

  private createChristmasResponse(days: number): string {
    return `${days > 1 ? 'Faltan' : 'Falta'} **${days}** ${
      days > 1 ? 'días' : 'día'
    } para navidad ${Emotes.PADORUUCHH} 🎄 🎁`;
  }
}
