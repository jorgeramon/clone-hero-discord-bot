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
    return this.model.findById(_id).lean<IUser>();
  }

  findOneById(id: string): Promise<IUser | null> {
    return this.model.findOne({ id }).lean<IUser>();
  }

  findOneByTag(tag: string): Promise<IUser | null> {
    return this.model.findOne({ tag }).lean<IUser>();
  }

  async create(data: IUser): Promise<IUser> {
    const user: UserDocument = await new this.model(data).save();
    return user.toObject();
  }
}
