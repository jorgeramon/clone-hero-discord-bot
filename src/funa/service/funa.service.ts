import { FunaRepository } from '@funa/repository/funa.repository';
import { IFuna } from '@funa/interface/funa.interface';
import { IUser } from '@user/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { User } from 'discord.js';
import { UserService } from '@user/service/user.service';

@Injectable()
export class FunaService {
  constructor(
    private readonly repository: FunaRepository,
    private readonly userService: UserService,
  ) {}

  async funa(fromDiscord: User, toDiscord: User): Promise<IFuna> {
    const from: IUser = await this.userService.findOrCreate(fromDiscord);
    const to: IUser = await this.userService.findOrCreate(toDiscord);

    return this.repository.create({
      from,
      to,
      auto: from.id === to.id,
    });
  }
}
