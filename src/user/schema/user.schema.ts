import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { IDocumentTimestamp } from '@shared/interface/document-timestamp.interface';

export type UserDocument = UserModel & Document & IDocumentTimestamp;

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  tag: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
