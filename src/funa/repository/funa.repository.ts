import { IFunaReport } from '@funa/interface/funa-report.interface';
import { IFuna } from '@funa/interface/funa.interface';
import { FunaDocument, FunaModel } from '@funa/schema/funa.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from '@shared/enum/colllections.enum';
import * as moment from 'moment';
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

  async getFunatorReport(
    from: string,
    limit: number,
    year: number,
  ): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $project: {
          to: 1,
          auto: 1,
          from: 1,
          reversed: 1,
          _id: 1,
          year: { $year: '$createdAt' },
        },
      },
      {
        $match: {
          from,
          auto: false,
          year,
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

  async getTopFunasReport(limit: number, year: number): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $project: {
          to: 1,
          auto: 1,
          from: 1,
          reversed: 1,
          _id: 1,
          year: { $year: '$createdAt' },
        },
      },
      { $match: { year } },
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

  async getTopFunatorsReport(
    limit: number,
    year: number,
  ): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $project: {
          to: 1,
          auto: 1,
          from: 1,
          reversed: 1,
          _id: 1,
          year: { $year: '$createdAt' },
        },
      },
      {
        $match: { auto: false, year },
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

  async getFunaReport(
    to: string,
    limit: number,
    year: number,
  ): Promise<IFunaReport[]> {
    const result = await this.model.aggregate<IFunaReport>([
      {
        $project: {
          to: 1,
          auto: 1,
          from: 1,
          reversed: 1,
          _id: 1,
          year: { $year: '$createdAt' },
        },
      },
      {
        $match: {
          to,
          auto: false,
          year,
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

  getFunasByUser(to: string, year: number): Promise<IFuna[]> {
    const initInterval = moment().year(year).startOf('year');
    const endInterval = moment().year(year).endOf('year');

    return this.model
      .find({
        to: Types.ObjectId(to),
        createdAt: { $gte: initInterval, $lte: endInterval },
      } as any)
      .lean();
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
