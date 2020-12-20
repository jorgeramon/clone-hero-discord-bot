import {
  CLIENT_DECORATOR,
  COMMAND_DECORATOR,
  GUARD_DECORATOR,
} from '@discord/constant/decorator';
import { Client, Message } from 'discord.js';
import { DiscoveryService, MetadataScanner, ModuleRef } from '@nestjs/core';
import { Injectable, OnApplicationBootstrap, Type } from '@nestjs/common';

import { ClientService } from '@discord/service/client.service';
import { IGuard } from '@discord/interface/guard.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { isObject } from 'lodash';

export type CommandInstance = { name: string; instance: any; method: string };

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly clientService: ClientService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onApplicationBootstrap(): void {
    const commands: CommandInstance[] = this.getCommands();

    const client: Client = this.clientService.getDiscordClient();

    client.on('ready', () => {
      console.log('> Conectado a Discord');
    });

    client.on('message', async (message: Message) => {
      const { prefix } = this.clientService;
      if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
      }

      const command_body: string = message.content.slice(prefix.length);
      const args: string[] = command_body.split(' ');
      const commandName: string = args.shift().toLowerCase();
      const commandInstance: CommandInstance = commands.find(
        (command: CommandInstance) => command.name === commandName,
      );

      if (!commandInstance) {
        return;
      }
      const { instance, method } = commandInstance;

      const guards: Type<IGuard>[] = this.scanGuardsMetadata(instance, method);

      for (let guardType of guards) {
        const guardInstance: IGuard = this.moduleRef.get(guardType, {
          strict: false,
        });

        if (guardInstance && !(await guardInstance.canActivate(message))) {
          return;
        }
      }

      instance[method](message, args);
    });
  }

  getCommands(): CommandInstance[] {
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    return providers
      .map((wrapper: InstanceWrapper) => wrapper.instance)
      .filter((instance) => !!instance && isObject(instance))
      .map((instance) =>
        this.metadataScanner
          .scanFromPrototype<any, CommandInstance>(
            instance,
            Object.getPrototypeOf(instance),
            (methodName: string) =>
              this.scanCommandMetadata(instance, methodName),
          )
          .filter((command) => !!command),
      )
      .reduce(
        (accumulator: CommandInstance[], value: CommandInstance[]) => [
          ...accumulator,
          ...value,
        ],
        [],
      );
  }

  private scanCommandMetadata(
    instance: any,
    method: string,
  ): CommandInstance | null {
    const commandMetadata = Reflect.getMetadata(
      COMMAND_DECORATOR,
      instance,
      method,
    );

    if (!commandMetadata) {
      return null;
    }

    this.scanClientMetadata(instance);

    const { name } = commandMetadata;

    return { name, instance, method };
  }

  private scanGuardsMetadata(instance: any, method: string): Type<IGuard>[] {
    const metadata: Type<IGuard>[] = Reflect.getMetadata(
      GUARD_DECORATOR,
      instance,
      method,
    );
    return metadata || [];
  }

  private scanClientMetadata(instance: any): void {
    for (let propertyKey in instance) {
      const clientMetadata = Reflect.getMetadata(
        CLIENT_DECORATOR,
        instance,
        propertyKey,
      );

      if (clientMetadata) {
        instance[propertyKey] = this.clientService.getDiscordClient();
      }
    }
  }
}
