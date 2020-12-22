import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@user/interface/user.interface';
import { UserDocument, UserModel } from '@user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly model: Model<UserDocument>,
  ) {}

  findById(_id: string): Promise<IUser | null> {
    return this.model.findById(_id).lean();
  }

  findOneById(id: string): Promise<IUser | null> {
    return this.model.findOne({ id }).lean();
  }

  findOneByTag(tag: string): Promise<IUser | null> {
    return this.model.findOne({ tag }).lean();
  }

  findWithTwitchAccount(): Promise<IUser[]> {
    return this.model.find({ twitchAccount: { $exists: true } }).lean();
  }

  findOneByTwitchAccount(twitchAccount: string): Promise<IUser | null> {
    return this.model.findOne({ twitchAccount }).lean();
  }

  async create(data: IUser): Promise<IUser> {
    const user: UserDocument = await new this.model(data).save();
    return user.toObject();
  }

  async update(_id: string, data: Partial<IUser>): Promise<IUser> {
    const result = await this.model.findByIdAndUpdate(
      _id,
      { $set: data } as any,
      {
        new: true,
      },
    );

    return result.toObject();
  }
}
