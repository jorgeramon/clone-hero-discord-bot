import { IFunaReport } from '@funa/interface/funa-report.interface';
import { IFuna } from '@funa/interface/funa.interface';
import { FunaRepository } from '@funa/repository/funa.repository';
import { Injectable } from '@nestjs/common';
import { IUser } from '@user/interface/user.interface';
import { UserService } from '@user/service/user.service';
import { User } from 'discord.js';

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

  async getFunaReport(
    toDiscord: User,
    limit: number,
    year: number,
  ): Promise<IFunaReport[]> {
    const user: IUser = await this.userService.findOrCreate(toDiscord);
    return this.repository.getFunaReport(user._id, limit, year);
  }

  async getFunatorReport(
    fromDiscord: User,
    limit: number,
    year: number,
  ): Promise<IFunaReport[]> {
    const user: IUser = await this.userService.findOrCreate(fromDiscord);
    return this.repository.getFunatorReport(user._id, limit, year);
  }

  getTopFunasReport(limit: number, year: number): Promise<IFunaReport[]> {
    return this.repository.getTopFunasReport(limit, year);
  }

  getTopFunatorsReport(limit: number, year: number): Promise<IFunaReport[]> {
    return this.repository.getTopFunatorsReport(limit, year);
  }

  async getFunasByUser(toDiscord: User, year: number): Promise<IFuna[]> {
    const to: IUser = await this.userService.findOrCreate(toDiscord);
    return this.repository.getFunasByUser(to._id, year);
  }

  async getLastestFromFunado(toDiscord: User): Promise<IFuna> {
    const to: IUser = await this.userService.findOrCreate(toDiscord);
    return this.repository.getLatestFromFunado(to._id);
  }

  async reverseFuna(_id: string): Promise<IFuna> {
    const funa: IFuna = await this.repository.findById(_id);

    const { _id: toId } = <IUser>funa.to;
    const { _id: fromId } = <IUser>funa.from;

    return this.repository.update(_id, {
      from: fromId,
      to: toId,
      reversed: true,
    });
  }
}
