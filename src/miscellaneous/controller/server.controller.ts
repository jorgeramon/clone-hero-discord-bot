import { CommandsGateway } from '@miscellaneous/gateway/commands.gateway';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('server')
export class ServerController {
  constructor(private readonly commandGateway: CommandsGateway) {}

  @Post()
  async message(@Body() data: any): Promise<string> {
    const { message, channel } = data;

    const { client } = this.commandGateway;

    const channelInstance = await client.channels.fetch(channel);

    if (!channelInstance) {
      return 'Channel not found';
    }

    await (channelInstance as any).send(message);

    return 'Ok';
  }
}
