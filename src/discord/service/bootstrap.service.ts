import {
  CLIENT_DECORATOR,
  COMMAND_DECORATOR,
  GUARD_DECORATOR,
  PREFIX_DECORATOR,
  SERVER_DECORATOR,
} from '@discord/constant/decorator';
import { Client, Message, MessageMentions } from 'discord.js';
import { DiscoveryService, MetadataScanner, ModuleRef } from '@nestjs/core';
import { Injectable, OnApplicationBootstrap, Type } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { DiscordService } from '@discord/service/discord.service';
import { IGuard } from '@discord/interface/guard.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { isObject } from 'lodash';

export type CommandInstance = {
  name: string;
  instance: any;
  method: string;
  actions: string[];
  description?: string;
  usage?: string;
  isAdmin?: boolean;
};

export const publicDocumentation: string[] = [];
export const adminDocumentation: string[] = [];

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly currentServer: string;

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly discordService: DiscordService,
    private readonly moduleRef: ModuleRef,
    private readonly configService: ConfigService,
  ) {
    this.currentServer = this.configService.get<string>('ENV');
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.discordService.connect();

    const commands: CommandInstance[] = this.getCommands();

    publicDocumentation.push(...this.getPublicDocumentation(commands));
    adminDocumentation.push(...this.getAdminDocumentation(commands));

    const client: Client = this.discordService.getDiscordClient();

    client.on('ready', () => {
      console.log('> Conectado a Discord');
    });

    client.on('message', async (message: Message) => {
      const { prefix } = this.discordService;

      if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
      }

      const command_body: string = message.content.slice(prefix.length);
      const args: string[] = command_body
        .split(' ')
        .filter((arg: string) => !MessageMentions.USERS_PATTERN.test(arg));
      const commandName: string = args.shift().toLowerCase();
      const commandInstances: CommandInstance[] = commands.filter(
        (command: CommandInstance) => command.name === commandName,
      );

      if (!commandInstances.length) {
        return;
      }

      console.log(commandInstances);

      const commandInstance: CommandInstance =
        commandInstances.length === 1
          ? commandInstances[0]
          : commandInstances.find((commandInstance: CommandInstance) => {
              const { actions } = commandInstance;

              if (
                args.length < actions.length ||
                (!actions.length && args.length) ||
                (actions.length && !args.length)
              ) {
                return false;
              }

              const $args: string = args.join(' ');
              const $actions: string = actions.join(' ');

              return $args.startsWith($actions);
            });

      if (!commandInstance) {
        return;
      }

      args.splice(0, commandInstance.actions.length);

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

    this.scanPropertiesMetadata(instance);

    const {
      name,
      action,
      description,
      usage,
      isAdmin,
      onlyFor,
      exceptFor,
    } = commandMetadata;

    if (onlyFor && !this.isServerIncluded(onlyFor)) {
      return null;
    }

    if (exceptFor && this.isServerIncluded(exceptFor)) {
      return null;
    }

    return {
      name: name.replace('{bot}', this.configService.get<string>('ENV')),
      instance,
      method,
      actions: Array.isArray(action) ? action : action ? [action] : [],
      description,
      usage,
      isAdmin,
    };
  }

  private scanGuardsMetadata(instance: any, method: string): Type<IGuard>[] {
    const metadata: Type<IGuard>[] = Reflect.getMetadata(
      GUARD_DECORATOR,
      instance,
      method,
    );
    return metadata || [];
  }

  private scanPropertiesMetadata(instance: any): void {
    for (let propertyKey in instance) {
      this.scanClientMetadata(instance, propertyKey);
      this.scanPrefixMetadata(instance, propertyKey);
      this.scanServerMetadata(instance, propertyKey);
    }
  }

  private scanClientMetadata(instance: any, propertyKey: string): void {
    const metadata = Reflect.getMetadata(
      CLIENT_DECORATOR,
      instance,
      propertyKey,
    );

    if (metadata) {
      instance[propertyKey] = this.discordService.getDiscordClient();
    }
  }

  private scanPrefixMetadata(instance: any, propertyKey: string): void {
    const metadata = Reflect.getMetadata(
      PREFIX_DECORATOR,
      instance,
      propertyKey,
    );

    if (metadata) {
      instance[propertyKey] = this.discordService.prefix;
    }
  }

  private scanServerMetadata(instance: any, propertyKey: string): void {
    const metadata = Reflect.getMetadata(
      SERVER_DECORATOR,
      instance,
      propertyKey,
    );

    if (metadata) {
      instance[propertyKey] = this.currentServer;
    }
  }

  private getDocumentation(commands: CommandInstance[]): string[] {
    const { prefix } = this.discordService;

    return commands
      .filter(
        (command: CommandInstance): boolean =>
          !!command.name && !!command.description,
      )
      .map(
        (command: CommandInstance): string =>
          `\`${prefix}${command.name}${
            command.actions.length ? ' ' + command.actions.join(' ') : ''
          }${command.usage ? ' ' + command.usage : ''}\`: ${
            command.description
          }`,
      );
  }

  private getPublicDocumentation(commands: CommandInstance[]): string[] {
    return this.getDocumentation(
      commands.filter((command: CommandInstance): boolean => !command.isAdmin),
    );
  }

  private getAdminDocumentation(commands: CommandInstance[]): string[] {
    return this.getDocumentation(
      commands.filter((command: CommandInstance): boolean => command.isAdmin),
    );
  }

  private isServerIncluded(server: string | string[]) {
    const servers: string[] = Array.isArray(server) ? server : [server];
    return servers.indexOf(this.currentServer) !== -1;
  }
}
