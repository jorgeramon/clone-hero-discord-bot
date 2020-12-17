import { Document, Schema as SchemaType } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IDocumentTimestamp } from '@shared/interface/document-timestamp.interface';
import { UserModel } from '@user/schema/user.schema';

export type FunaDocument = FunaModel & Document & IDocumentTimestamp;

@Schema({ collection: 'funas', timestamps: true })
export class FunaModel {
  @Prop({ type: SchemaType.Types.ObjectId, ref: UserModel.name })
  from: UserModel;

  @Prop({ type: SchemaType.Types.ObjectId, ref: UserModel.name })
  to: UserModel;

  @Prop()
  auto?: boolean;

  @Prop()
  reversed?: boolean;
}

export const FunaSchema = SchemaFactory.createForClass(FunaModel);
