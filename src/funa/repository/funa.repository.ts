import { IFunaReport } from '@funa/interface/funa-report.interface';
import { IFuna } from '@funa/interface/funa.interface';
import { FunaDocument, FunaModel } from '@funa/schema/funa.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from '@shared/enum/colllections.enum';
import { Model, Types } from 'mongoose';

@Injectable()
export class FunaRepository {
  constructor(
    @InjectModel(FunaModel.name) private readonly model: Model<FunaDocument>,
  ) {}

  async create(data: IFuna): Promise<IFuna> {
    const funa: FunaDocument = await new this.model(data).save();
    return funa.toObject();
  }

  async getFunatorReport(from: string, limit: number): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $match: {
          from,
          auto: false,
        },
      },
      {
        $group: {
          _id: '$to',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: Collections.USERS,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    return result;
  }

  async getTopFunasReport(limit: number): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $group: {
          _id: '$to',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: Collections.USERS,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    return result;
  }

  async getTopFunatorsReport(limit: number): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $match: { auto: false },
      },
      {
        $group: {
          _id: '$from',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: Collections.USERS,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    return result;
  }

  async getFunaReport(to: string, limit: number): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $match: {
          to,
          auto: false,
        },
      },
      {
        $group: {
          _id: '$from',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: Collections.USERS,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    return result;
  }

  getFunasByUser(to: string): Promise<IFuna[]> {
    return this.model.find({ to: Types.ObjectId(to) } as any).lean();
  }

  getLatestFromFunado(to: string): Promise<IFuna> {
    return this.model
      .findOne({ to: Types.ObjectId(to) } as any)
      .sort({ createdAt: -1 })
      .limit(1)
      .populate(['from', 'to'])
      .lean();
  }

  findById(_id: string): Promise<IFuna> {
    return this.model.findById(_id).populate(['from', 'to']).lean();
  }

  async update(_id: string, data: Partial<IFuna>): Promise<IFuna> {
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
