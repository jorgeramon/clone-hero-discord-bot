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
}
