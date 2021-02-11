import { CHHRoles, PHCRoles, Roles } from '@shared/enum/roles.enum';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Environments } from '@shared/enum/environments.enum';

@Injectable()
export class EnvironmentService implements OnApplicationBootstrap {
  public roles: Roles;

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap(): void {
    this.roles =
      this.configService.get<string>('ENV') === Environments.CHH
        ? CHHRoles
        : PHCRoles;
  }
}
