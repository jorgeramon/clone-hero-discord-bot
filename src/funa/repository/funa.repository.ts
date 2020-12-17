import { IFuna } from '@funa/interface/funa.interface';
import { FunaDocument, FunaModel } from '@funa/schema/funa.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FunaRepository {
  constructor(
    @InjectModel(FunaModel.name) private readonly model: Model<FunaDocument>,
  ) {}

  async create(data: IFuna): Promise<IFuna> {
    const funa: FunaDocument = await new this.model(data).save();
    return funa.toObject();
  }
}
