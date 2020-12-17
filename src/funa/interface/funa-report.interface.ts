import { IUser } from '@user/interface/user.interface';

export interface IFunaReport {
  _id: string;
  user: IUser;
  count: number;
}
