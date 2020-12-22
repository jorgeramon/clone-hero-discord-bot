import { IDocument } from '@shared/interface/document.interface';
import { IDocumentTimestamp } from '@shared/interface/document-timestamp.interface';

export interface IUser extends IDocument, IDocumentTimestamp {
  id: string;
  tag: string;
  twitchAccount?: string;
  twitchId?: string;
}
