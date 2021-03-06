import { IUser } from '@user/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { User } from 'discord.js';
import { UserRepository } from '@user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findOrCreate(data: User): Promise<IUser> {
    const user = await this.repository.findOneById(data.id);
    return user || this.repository.create({ id: data.id, tag: data.tag });
  }

  findOneByDiscordId(discordId: string): Promise<IUser> {
    return this.repository.findOneById(discordId);
  }

  async updateTwitchAccount(
    discordUser: User,
    twitchId: string,
    twitchAccount: string,
  ): Promise<IUser> {
    const user: IUser = await this.findOrCreate(discordUser);
    return this.repository.update(user._id, { twitchId, twitchAccount });
  }

  findWithTwitchAccount(): Promise<IUser[]> {
    return this.repository.findWithTwitchAccount();
  }

  findOneByTwitchAccount(twitchAccount: string): Promise<IUser | null> {
    return this.repository.findOneByTwitchAccount(twitchAccount);
  }
}
