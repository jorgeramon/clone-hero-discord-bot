import { IDocument } from '@shared/interface/document.interface';
import { IDocumentTimestamp } from '@shared/interface/document-timestamp.interface';
import { IUser } from '@user/interface/user.interface';

export interface IFuna extends IDocument, IDocumentTimestamp {
  from: IUser | string;
  to: IUser | string;
  auto?: boolean;
  reversed?: boolean;
}
